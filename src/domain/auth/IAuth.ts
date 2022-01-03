import { AuthType } from "../../enums/AuthType";
import { IBaseEntity } from "../IBaseEntity";
import { IUser } from "../user/IUser";

export interface IAuth extends IBaseEntity {
    id: string;
    userId: string;
    type: AuthType;
    username: string;
    password: string;
    forgotKey: string | null;
    forgotExpire: Date | null;

    /* Relationship */

    user: IUser | null;
}