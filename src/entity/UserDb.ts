import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseDbEntity } from "../base/entity/BaseDbEntity";
import { IAuth } from '../domain/auth/IAuth';
import { User } from "../domain/user/User";
import { GenderType } from '../enums/GenderType';
import { RoleId } from '../enums/RoleId';
import { USER_SCHEMA } from '../schema/UserSchema';
import { IUser } from './../domain/user/IUser';

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

    toEntity(): User {
        return new User(this);
    }
    
    fromEntity(entity: User): IUser {
        return entity.toData();
    }

    auths: IAuth[] | null;
}