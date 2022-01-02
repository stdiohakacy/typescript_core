import { ClientStatus } from './../../enums/ClientStatus';
import { IUser } from "../user/IUser";

export interface IClient extends IUser {
    status: ClientStatus;
    email: string;
    phone: string | null;
    address: string | null;
    culture: string | null;
    currency: string | null;
    activeKey: string | null;
    activeExpire: Date | null;
    activatedAt: Date | null;
    archivedAt: Date | null;
}