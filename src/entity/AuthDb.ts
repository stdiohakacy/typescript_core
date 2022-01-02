import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseDbEntity } from "../base/entity/BaseDbEntity";
import { Auth } from "../domain/auth/Auth";
import { IAuth } from "../domain/auth/IAuth";
import { IUser } from "../domain/user/IUser";
import { AuthType } from "../enums/AuthType";
import { AUTH_SCHEMA } from "../schema/AuthSchema";

@Entity(AUTH_SCHEMA.TABLE_NAME)
export class AuthDb extends BaseDbEntity<Auth> implements IAuth {
    @PrimaryGeneratedColumn('uuid', { name: AUTH_SCHEMA.COLUMNS.ID })
    id: string;

    @Column('uuid', { name: AUTH_SCHEMA.COLUMNS.USER_ID })
    userId: string;

    @Column('enum', { name: AUTH_SCHEMA.COLUMNS.TYPE, enum: AuthType })
    type: AuthType;

    @Column('varchar', { name: AUTH_SCHEMA.COLUMNS.USERNAME, length: 120 })
    username: string;

    @Column('varchar', { name: AUTH_SCHEMA.COLUMNS.PASSWORD, length: 32 })
    password: string;

    @Column('varchar', { name: AUTH_SCHEMA.COLUMNS.FORGOT_KEY, length: 64, nullable: true })
    forgotKey: string | null;

    @Column('timestamptz', { name: AUTH_SCHEMA.COLUMNS.FORGOT_EXPIRE, nullable: true })
    forgotExpire: Date | null;

    /* Relationship */

    user: IUser | null;

    toEntity(): Auth {
        return new Auth(this);
    }

    fromEntity(entity: Auth) {
        return entity.toData();
    }
}