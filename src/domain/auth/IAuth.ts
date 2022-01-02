import { AuthType } from "../../enums/AuthType";
import { IBaseEntity } from "../IBaseEntity";

export interface IAuth extends IBaseEntity {
    id: string;
    userId: string;
    type: AuthType;
    username: string;
    password: string;
    forgotKey: string | null;
    forgotExpire: Date | null;
}