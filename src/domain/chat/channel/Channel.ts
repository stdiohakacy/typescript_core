import { BaseEntity } from "../../../base/entity/BaseEntity";
import { MessageError } from "../../../exceptions/MessageError";
import { SystemError } from "../../../exceptions/SystemError";
import { IChannel } from "./IChannel";
import * as validator from 'class-validator';
import { User } from "../../user/User";

export class Channel extends BaseEntity<IChannel> implements IChannel {
    constructor(data?: IChannel) {
        super(data);
    }

    get id(): string {
        return this.data.id;
    }

    get name(): string {
        return this.data.name;
    }

    set name(val: string) {
        if (!val)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'name');

        if (val.length > 150)
            throw new SystemError(MessageError.PARAM_LEN_LESS_OR_EQUAL, 'name', 150);

        this.data.name = val;
    }

    get lastMessageId(): string | null{
        return this.data.lastMessageId;
    }

    set lastMessageId(val: string | null) {
        if (!val)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'last message');

        if (!validator.isUUID(val))
            throw new SystemError(MessageError.PARAM_INVALID, 'last message');

        this.data.lastMessageId = val;
    }

    get lastPersonId(): string | null{
        return this.data.lastPersonId;
    }

    set lastPersonId(val: string | null) {
        if (!val)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'last person');

        if (!validator.isUUID(val))
            throw new SystemError(MessageError.PARAM_INVALID, 'last person');

        this.data.lastPersonId = val;
    }

    get lastSeen(): Date | null {
        return this.data.lastSeen;
    }

    set lastSeen(val: Date | null) {
        this.data.lastSeen = val;
    }

    /* Relationship */

    get users(): User[] | null {
        return this.data.users ? this.data.users.map(user => new User(user)) : null;
    }
}