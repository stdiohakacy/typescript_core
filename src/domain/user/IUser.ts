import { RoleId } from './../../enums/RoleId';
import { GenderType } from "../../enums/GenderType";
import { IBaseEntity } from "../IBaseEntity";

export interface IUser extends IBaseEntity {
    id: string;
    roleId: RoleId;
    firstName: string;
    lastName: string | null;
    avatar: string | null;
    gender: GenderType | null;
    birthday: string | null;
}