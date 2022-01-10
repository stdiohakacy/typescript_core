import { IBaseEntity } from "../../IBaseEntity";
import { IUser } from "../../user/IUser";

export interface IChannel extends IBaseEntity {
    id: string;
    name: string;
    lastMessageId: string | null;
    lastPersonId: string | null;
    lastSeen: Date | null;

    /* Relationship */
    users: IUser[] | null;
}