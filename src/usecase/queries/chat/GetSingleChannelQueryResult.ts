import { Channel } from "../../../domain/chat/channel/Channel";

export class GetSingleChannelQueryResult {
    id: string;
    name: string;
    lastMessageId: string | null;
    lastPersonId: string | null;
    lastSeen: Date | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;

    constructor(channel: Channel) {
        this.id = channel.id;
        this.name = channel.name;
        this.lastMessageId = channel.lastMessageId;
        this.lastPersonId = channel.lastPersonId;
        this.lastSeen = channel.lastSeen;
        this.createdAt = channel.createdAt;
        this.updatedAt = channel.updatedAt;
        this.deletedAt = channel.deletedAt;
    }
}