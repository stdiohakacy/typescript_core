import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseDbEntity } from "../base/entity/BaseDbEntity";
import { IAuth } from '../domain/auth/IAuth';
import { IChannel } from '../domain/chat/channel/IChannel';
import { User } from "../domain/user/User";
import { GenderType } from '../enums/GenderType';
import { RoleId } from '../enums/RoleId';
import { USER_SCHEMA } from '../schema/UserSchema';
import { IUser } from './../domain/user/IUser';
import { ChannelDb } from './ChannelDb';

@Entity(USER_SCHEMA.TABLE_NAME)
export class UserDb extends BaseDbEntity<User> implements IUser {
    @PrimaryGeneratedColumn('uuid', { name: USER_SCHEMA.COLUMNS.ID })
    id: string;

    @Column('varchar', { name: USER_SCHEMA.COLUMNS.ROLE_ID })
    roleId: RoleId;

    @Column('varchar', { name: USER_SCHEMA.COLUMNS.FIRST_NAME })
    firstName: string;

    @Column('varchar', { name: USER_SCHEMA.COLUMNS.LAST_NAME, nullable: true })
    lastName: string | null;

    @Column('varchar', { name: USER_SCHEMA.COLUMNS.AVATAR, nullable: true })
    avatar: string | null;

    @Column('varchar', { name: USER_SCHEMA.COLUMNS.GENDER, length: 6 ,nullable: true })
    gender: GenderType | null;

    @Column('date', { name: USER_SCHEMA.COLUMNS.BIRTHDAY, nullable: true })
    birthday: string | null;

    @Column('uuid', { name: 'channel_id', nullable: true })
    channelId: string | null;

    /* Relationship */

    @ManyToOne(() => ChannelDb, channel => channel.users)
    @JoinColumn({ name: 'channel_id' })
    channel: IChannel | null;

    toEntity(): User {
        return new User(this);
    }
    
    fromEntity(entity: User): IUser {
        return entity.toData();
    }

    auths: IAuth[] | null;
}