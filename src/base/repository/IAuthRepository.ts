import { IBaseRepository } from "../../base/repository/IBaseRepository";
import { Auth } from "../../domain/auth/Auth";

export interface IAuthRepository extends IBaseRepository<Auth, string> {
    getAllByUser(userId: string): Promise<Auth[]>;
    getByUsername(username: string): Promise<Auth | null>;
    getByUsernamePassword(username: string, password: string): Promise<Auth | null>;
}