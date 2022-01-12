import { Service } from "typedi";
import { BaseRepository } from "../../base/repository/BaseRepository";
import { IChannelRepository } from "../../base/repository/IChannelRepository";
import { Channel } from "../../domain/chat/channel/Channel";
import { ChannelDb } from "../../entity/ChannelDb";
import { CHANNEL_SCHEMA } from "../../schema/ChannelSchema";

@Service('channel.repository')
export class ChannelRepository extends BaseRepository<Channel, ChannelDb, string> implements IChannelRepository {
    constructor() {
        super(ChannelDb, CHANNEL_SCHEMA)
    }

    async isChannelExist(name: string): Promise<boolean> {
        const query = this.repository.createQueryBuilder('channel')
            .where(`name = :name`, { name });
        const result = await query.getOne();
        return !!result;
    }

    async getByName(name: string): Promise<Channel | undefined> {
        const result = await this.repository.createQueryBuilder('channel')
            .where('channel.name = :name', { name })
            .getOne();

        return result?.toEntity();
    }
}