import { User } from './../../domain/user/User';
import { IBaseRepository } from "./IBaseRepository";

export interface IUserRepository extends IBaseRepository<User, string> {}