import * as validator from 'class-validator';
import { BaseEntity } from "../../../base/entity/BaseEntity";
import { MessageStatus } from '../../../enums/MessageStatus';
import { MessageError } from "../../../exceptions/MessageError";
import { SystemError } from "../../../exceptions/SystemError";
import { MessageType } from './../../../enums/MessageType';
import { IMessage } from "./IMessage";

export class Message extends BaseEntity<IMessage> implements IMessage {
    constructor(data?: IMessage) {
        super(data);
    }

    get id(): string {
        return this.data.id;
    }
    
    get channelId(): string {
        return this.data.channelId;
    }

    set channelId(val: string) {
        if(!val) 
            throw new SystemError(MessageError.PARAM_REQUIRED, 'channel id');
        if(!validator.isUUID(val))
            throw new SystemError(MessageError.PARAM_INVALID, 'channel id');
        this.data.channelId = val;
    }

    get userId(): string {
        return this.data.userId;
    }

    set userId(val: string) {
        if(!val) 
            throw new SystemError(MessageError.PARAM_REQUIRED, 'user id');
        if(!validator.isUUID(val))
            throw new SystemError(MessageError.PARAM_INVALID, 'user id');
        this.data.userId = val;
    }
    
    get content(): string {
        return this.data.content;
    }

    set content(val: string) {
        if(!val) 
            throw new SystemError(MessageError.PARAM_REQUIRED, 'content');
        this.data.content = val;
    }

    get type(): MessageType {
        return this.data.type;
    }

    set type(val: MessageType) {
        if(!val) 
            throw new SystemError(MessageError.PARAM_REQUIRED, 'type');
        if(!validator.isEnum(val, MessageType))
            throw new SystemError(MessageError.PARAM_INVALID, 'type');
        this.data.type = val;
    }

    get status(): MessageStatus {
        return this.data.status;
    }

    set status(val: MessageStatus) {
        if(!val) 
            throw new SystemError(MessageError.PARAM_REQUIRED, 'status');
        if(!validator.isEnum(val, MessageStatus))
            throw new SystemError(MessageError.PARAM_INVALID, 'status');
        this.data.status = val;
    }
}