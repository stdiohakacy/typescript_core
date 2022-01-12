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

      // update socket id for user
      const addSocketUserCommandHandler = Container.get(AddSocketUserCommandHandler);
      const data = new AddSocketUserCommand();
      data.userId = userId;
      data.socketId = socketId;
      await addSocketUserCommandHandler.handle(data);
    })
  }
}

startApplication()
  .then(() => console.log(`Express server start on port ${3000}`))
  .catch(err => console.log(err))