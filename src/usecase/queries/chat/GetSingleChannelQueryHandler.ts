import { Inject, Service } from 'typedi';
import { IUserRepository } from '../../../base/repository/IUserRepository';
import { Channel } from '../../../domain/chat/channel/Channel';
import { CreateChannelCommandHandler } from '../../commands/chat/CreateChannelCommandHandler';
import { IChannelRepository } from './../../../base/repository/IChannelRepository';
import { IQueryHandler } from './../../../base/usecase/IQueryHandler';
import { MessageError } from './../../../exceptions/MessageError';
import { SystemError } from './../../../exceptions/SystemError';
import { GetSingleChannelQuery } from './GetSingleChannelQuery';
import { GetSingleChannelQueryResult } from './GetSingleChannelQueryResult';


@Service()
export class GetSingleChannelQueryHandler implements IQueryHandler<GetSingleChannelQuery, GetSingleChannelQueryResult> {
    @Inject('user.repository')
    private readonly _userRepository: IUserRepository;

    @Inject('channel.repository')
    private readonly _channelRepository: IChannelRepository;
    
    @Inject()
    private readonly _createChannelCommandHandler: CreateChannelCommandHandler;

    async handle(param: GetSingleChannelQuery): Promise<GetSingleChannelQueryResult> {
        if(!param.fromUserId)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'from user');
        if(!param.toUserId)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'to user');
        const isUserExist = await this._userRepository.getById(param.toUserId);
        if(!isUserExist)
            throw new SystemError(MessageError.PARAM_NOT_FOUND, 'to user');
        
        const channelName = [param.toUserId, param.fromUserId].sort().join();
        let channel = await this._channelRepository.getByName(channelName);
        if(!channel) {
            const data = new Channel();
            data.name = channelName;
            channel = await this._createChannelCommandHandler.handle(data);
        }

        return new GetSingleChannelQueryResult(channel);
    }
}