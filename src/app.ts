import { Server } from "http";
import socketIO from 'socket.io';
import Container from 'typedi';
import { ApiService } from './ApiService';
import { ENABLE_API_SERVICE, ENABLE_SOCKET_SERVICE } from './configs/Configuration';
import { IDbContext } from './database/IDbContext';
import { emitAsync } from './libs/socket';
import { ChannelRepository } from './repositories/chat/ChannelRepository';
import { SocketService } from './services/socket/SocketService';
import './SingletonRegister';
import { AddSocketUserCommand } from "./usecase/commands/user/AddSocketUserCommand";
import { AddSocketUserCommandHandler } from "./usecase/commands/user/AddSocketUserCommandHandler";
import { RemoveSocketUserCommand } from "./usecase/commands/user/RemoveSocketUserCommand";
import { RemoveSocketUserCommandHandler } from "./usecase/commands/user/RemoveSocketUserCommandHandler";
import { GetSingleChannelQuery } from "./usecase/queries/chat/GetSingleChannelQuery";
import { GetSingleChannelQueryHandler } from "./usecase/queries/chat/GetSingleChannelQueryHandler";

const dbContext = Container.get<IDbContext>('db.context');
let httpServer: Server;

const startApplication = async (): Promise<void> => {
  await dbContext.createConnection();
  if(ENABLE_API_SERVICE) {
    httpServer = new ApiService().setup();
  }
  if(ENABLE_SOCKET_SERVICE) {
    let userId: string = '';
    let io = socketIO(httpServer);
    SocketService.getInstance().setChannelRepository(new ChannelRepository());

    io.on('connection', async (socket: socketIO.Socket) => {
      let socketId: string = socket.id;
      await emitAsync(socket, 'init-socket', socketId, uid => userId = uid);

      // add socket id for user
      const addSocketUserCommandHandler = Container.get(AddSocketUserCommandHandler);
      const data = new AddSocketUserCommand();
      data.userId = userId;
      data.socketId = socketId;
      await addSocketUserCommandHandler.handle(data);

      socket.on('get-single-channel', async (data: any, cbFn) => {
        try {
          const getSingleChannelQueryHandler = Container.get(GetSingleChannelQueryHandler);
          const param = new GetSingleChannelQuery();
          param.fromUserId = userId;
          param.toUserId = data.toUserId;

          const channel = await getSingleChannelQueryHandler.handle(param);
          console.log(`Channel id is ${channel.id} - time ${new Date().toLocaleString()}`);
          cbFn(channel);
        } catch (error) {
          console.log(`error ${error.message}`);
          io.to(socketId).emit('error', { code: 500, message: error.message });
        }
      })

      socket.on('disconnect', async _reason => {
        // remove socket id for user
        const removeSocketUserCommandHandler = Container.get(RemoveSocketUserCommandHandler);
        const data = new RemoveSocketUserCommand();
        data.userId = userId;
        data.socketId = socketId;
        await removeSocketUserCommandHandler.handle(data);
      })
    })
  }
}

startApplication()
  .then(() => console.log(`Express server start on port ${3000}`))
  .catch(err => console.log(err))