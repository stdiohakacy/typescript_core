import { Service } from 'typedi';
import { BaseRepository } from "../../base/repository/BaseRepository";
import { Auth } from "../../domain/auth/Auth";
import { UserDb } from '../../entity/UserDb';
import { AUTH_SCHEMA } from '../../schema/AuthSchema';
import { USER_SCHEMA } from '../../schema/UserSchema';
import { IAuthRepository } from './../../base/repository/IAuthRepository';
import { AuthDb } from './../../entity/AuthDb';

@Service('auth.repository')
export class AuthRepository extends BaseRepository<Auth, AuthDb, string> implements IAuthRepository {
    constructor() {
        super(AuthDb, AUTH_SCHEMA);
    }

    async getAllByUser(userId: string): Promise<Auth[]> {
        const results = await this.repository.createQueryBuilder(AUTH_SCHEMA.TABLE_NAME)
            .where(`${AUTH_SCHEMA.TABLE_NAME}.${AUTH_SCHEMA.COLUMNS.USER_ID} = :userId`, { userId })
            .getMany();
        return results.map(result => result.toEntity());
    }

    async getByUsername(username: string): Promise<Auth | null> {
        const query = this.repository.createQueryBuilder(AUTH_SCHEMA.TABLE_NAME)
        .innerJoinAndMapOne(`${AUTH_SCHEMA.TABLE_NAME}.${AUTH_SCHEMA.RELATED_ONE.USER}`, UserDb, USER_SCHEMA.TABLE_NAME, `${AUTH_SCHEMA.TABLE_NAME}.${AUTH_SCHEMA.COLUMNS.USER_ID} = ${USER_SCHEMA.TABLE_NAME}.${USER_SCHEMA.COLUMNS.ID}`)
        .where(`LOWER(${AUTH_SCHEMA.TABLE_NAME}.${AUTH_SCHEMA.COLUMNS.USERNAME}) = LOWER(:username)`, { username });

        const result = await query.getOne();
        return result ? result.toEntity() : null;
    }

    async getByUsernamePassword(username: string, password: string): Promise<Auth | null> {
        const query = this.repository.createQueryBuilder(AUTH_SCHEMA.TABLE_NAME)
            .innerJoinAndMapOne(`${AUTH_SCHEMA.TABLE_NAME}.${AUTH_SCHEMA.RELATED_ONE.USER}`, UserDb, USER_SCHEMA.TABLE_NAME, `${AUTH_SCHEMA.TABLE_NAME}.${AUTH_SCHEMA.COLUMNS.USER_ID} = ${USER_SCHEMA.TABLE_NAME}.${USER_SCHEMA.COLUMNS.ID}`)
            .where(`LOWER(${AUTH_SCHEMA.TABLE_NAME}.${AUTH_SCHEMA.COLUMNS.USERNAME}) = LOWER(:username)`, { username })
            .andWhere(`${AUTH_SCHEMA.TABLE_NAME}.${AUTH_SCHEMA.COLUMNS.PASSWORD} = :password`, { password });

        const result = await query.getOne();
        return result ? result.toEntity() : null;
    }
}