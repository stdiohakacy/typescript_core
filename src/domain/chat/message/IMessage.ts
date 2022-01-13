import { MessageStatus } from '../../../enums/MessageStatus';
import { IBaseEntity } from "../../IBaseEntity";
import { MessageType } from './../../../enums/MessageType';

export interface IMessage extends IBaseEntity {
    id: string;
    channelId: string;
    userId: string;
    content: string;
    type: MessageType;
    status: MessageStatus;
}