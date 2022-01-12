import { IChannelRepository } from './../../../base/repository/IChannelRepository';
import { MessageError } from './../../../exceptions/MessageError';
import { SystemError } from './../../../exceptions/SystemError';
import { Inject, Service } from 'typedi';
import { CreateChannelCommand } from './CreateChannelCommand';
import { ICommandHandler } from './../../../base/usecase/ICommandHandler';
import { Channel } from '../../../domain/chat/channel/Channel';

@Service()
export class CreateChannelCommandHandler implements ICommandHandler<CreateChannelCommand, Channel> {
    @Inject('channel.repository')
    private readonly _channelRepository: IChannelRepository;

    async handle(param: CreateChannelCommand): Promise<Channel> {
        if(!param.name)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'name');
        const isChannelExist = await this._channelRepository.isChannelExist(param.name);
        if(isChannelExist)
            throw new SystemError(MessageError.PARAM_NOT_EXISTS, 'channel');

        const data = new Channel();
        data.name = param.name;

        const channel = await this._channelRepository.createGet(data);
        if(!channel)
            throw new SystemError(MessageError.DATA_CANNOT_SAVE);
        return channel;
    }
}