import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseDbEntity } from "../base/entity/BaseDbEntity";
import { IChannel } from '../domain/chat/channel/IChannel';
import { Message } from "../domain/chat/message/Message";
import { MessageStatus } from '../enums/MessageStatus';
import { MessageType } from '../enums/MessageType';
import { IMessage } from './../domain/chat/message/IMessage';
import { ChannelDb } from './ChannelDb';

@Entity('message')
export class MessageDb extends BaseDbEntity<Message> implements IMessage {
    @PrimaryGeneratedColumn('uuid', { name: 'id'})
    id: string;

    @Column({ name: 'channel_id', type: 'uuid' })
    channelId: string;

    @Column({ name: 'user_id', type: 'uuid' })
    userId: string;

    @Column({ name: 'content', type: 'varchar', nullable: true })
    content: string;

    @Column({
        name: 'type',
        type: 'enum',
        enum: MessageType,
        default: MessageType.CHAT,
    })
    type: MessageType;
    
    @Column({
        name: 'status',
        type: 'enum',
        enum: MessageStatus,
        default: MessageStatus.SENT,
    })
    status: MessageStatus;

    /* Relationship */

    @ManyToOne(() => ChannelDb, channel => channel.messages)
    @JoinColumn({ name: 'channel_id' })
    channel: IChannel | null;

    toEntity(): Message {
        return new Message(this);
    }
    fromEntity(entity: Message) {
        return entity.toData();
    }
}