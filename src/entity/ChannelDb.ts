import { IMessage } from './../domain/chat/message/IMessage';
import { MessageDb } from './MessageDb';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseDbEntity } from "../base/entity/BaseDbEntity";
import { Channel } from "../domain/chat/channel/Channel";
import { IChannel } from "../domain/chat/channel/IChannel";
import { IUser } from "../domain/user/IUser";
import { ROLE_SCHEMA } from "../schema/RoleSchema";
import { UserDb } from "./UserDb";

@Entity('channel')
export class ChannelDb extends BaseDbEntity<Channel> implements IChannel {
    @PrimaryGeneratedColumn('uuid', { name: ROLE_SCHEMA.COLUMNS.ID })
    id: string;

    @Column('varchar', { name: ROLE_SCHEMA.COLUMNS.NAME, length: 150 })
    name: string;

    @Column('uuid', { name: 'last_message_id', nullable: true })
    lastMessageId: string | null;

    @Column('uuid', { name: 'last_person_id', nullable: true })
    lastPersonId: string | null;

    @Column('timestamptz', { name: 'last_seen', nullable: true })
    lastSeen: Date | null;
    
    /* Relationship */

    @OneToMany(() => UserDb, users => users.channel)
    users: IUser[] | null;

    @OneToMany(() => MessageDb, messages => messages.channel)
    messages: IMessage[] | null;

    toEntity(): Channel {
        return new Channel(this);
    }

    fromEntity(entity: Channel) {
        return entity.toData();
    }
}