import { ManagerStatus } from './../../enums/ManagerStatus';
import { IUser } from "../user/IUser";

export interface IManager extends IUser {
    status: ManagerStatus,
    archivedAt: Date | null;
    email: string;
}