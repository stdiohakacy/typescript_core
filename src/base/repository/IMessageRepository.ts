import { Message } from "../../domain/chat/message/Message";
import { IBaseRepository } from "./IBaseRepository";

export interface IMessageRepository extends IBaseRepository<Message, string> {}