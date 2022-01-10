import { IChannelRepository } from './../../../base/repository/IChannelRepository';
import { MessageError } from './../../../exceptions/MessageError';
import { SystemError } from './../../../exceptions/SystemError';
import { Inject, Service } from 'typedi';
import { CreateChannelCommand } from './CreateChannelCommand';
import { ICommandHandler } from './../../../base/usecase/ICommandHandler';
import { Channel } from '../../../domain/chat/channel/Channel';

@Service()
export class CreateChannelCommandHandler implements ICommandHandler<CreateChannelCommand, string> {
    @Inject('channel.repository')
    private readonly _channelRepository: IChannelRepository;

    async handle(param: CreateChannelCommand): Promise<string> {
        if(!param.name)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'name');
        const isChannelExist = await this._channelRepository.isChannelExist(param.name);
        if(isChannelExist)
            throw new SystemError(MessageError.PARAM_NOT_EXISTS, 'channel');

            console.log(param.name)
        const channel = new Channel();
        channel.name = param.name;

        const hasSucceed = await this._channelRepository.create(channel);
        if(!hasSucceed)
            throw new SystemError(MessageError.DATA_CANNOT_SAVE);
        return hasSucceed;
    }
}