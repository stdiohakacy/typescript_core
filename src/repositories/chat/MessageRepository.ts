import { Service } from "typedi";
import { BaseRepository } from "../../base/repository/BaseRepository";
import { Message } from "../../domain/chat/message/Message";
import { MessageDb } from "../../entity/MessageDb";
import { MESSAGE_SCHEMA } from "../../schema/MessageSchema";

@Service('message.repository')
export class MessageRepository extends BaseRepository<Message, MessageDb, string> {
    constructor() {
        super(MessageDb, MESSAGE_SCHEMA)
    }
} 