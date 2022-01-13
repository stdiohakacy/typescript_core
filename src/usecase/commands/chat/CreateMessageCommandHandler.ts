import { IMessageRepository } from './../../../base/repository/IMessageRepository';
import { Inject, Service } from "typedi";
import { ICommandHandler } from "../../../base/usecase/ICommandHandler";
import { CreateMessageCommand } from "./CreateMessageCommand";
import { SystemError } from '../../../exceptions/SystemError';
import { MessageError } from '../../../exceptions/MessageError';
import { IChannelRepository } from '../../../base/repository/IChannelRepository';
import { Message } from '../../../domain/chat/message/Message';
import { MessageStatus } from '../../../enums/MessageStatus';
import { MessageType } from '../../../enums/MessageType';
import { IUserRepository } from '../../../base/repository/IUserRepository';

@Service()
export class CreateMessageCommandHandler implements ICommandHandler<CreateMessageCommand, string> {
    @Inject('message.repository')
    private readonly _messageRepository: IMessageRepository;

    @Inject('channel.repository')
    private readonly _channelRepository: IChannelRepository;

    @Inject('user.repository')
    private readonly _userRepository: IUserRepository;

    async handle(param: CreateMessageCommand): Promise<string> {
        if(!param.channelId)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'channel');
        if(!param.userId)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'user');

        const isChannelExist = await this._channelRepository.getById(param.channelId);
        if(!isChannelExist)
            throw new SystemError(MessageError.PARAM_NOT_EXISTS, 'channel');
        const isUserExist = await this._userRepository.getById(param.userId);
        if(!isUserExist)
            throw new SystemError(MessageError.PARAM_NOT_EXISTS, 'user');

        const data = new Message();
        data.channelId = param.channelId;
        data.userId = param.userId;
        data.content = param.content;
        data.status = MessageStatus.SENT;
        data.type = MessageType.CHAT;

        const id = await this._messageRepository.create(data);
        if(!id)
            throw new SystemError(MessageError.DATA_CANNOT_SAVE);
        return id
    }
}