import { IUserRepository } from './../../base/repository/IUserRepository';
import { Service } from "typedi";
import { BaseRepository } from "../../base/repository/BaseRepository";
import { User } from "../../domain/user/User";
import { UserDb } from "../../entity/UserDb";
import { USER_SCHEMA } from '../../schema/UserSchema';


@Service('user.repository')
export class UserRepository extends BaseRepository<User, UserDb, string> implements IUserRepository {
    constructor() {
        super(UserDb, USER_SCHEMA)
    }
}