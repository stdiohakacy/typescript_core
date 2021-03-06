import { MessageError } from './../../exceptions/MessageError';
import { SystemError } from './../../exceptions/SystemError';
import { RoleId } from './../../enums/RoleId';
import { BaseEntity } from "../../base/entity/BaseEntity";
import { IUser } from "./IUser";
import * as validator from 'class-validator';
import { GenderType } from '../../enums/GenderType';

export class UserBase<T extends IUser> extends BaseEntity<T> implements IUser {
    constructor(data?: T) {
        super(data);
    }

    get id(): string {
        return this.data.id;
    }

    get roleId(): RoleId {
        return this.data.roleId;
    }

    set roleId(val: RoleId) {
        if (!val)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'role');

        if (!validator.isUUID(val) || !validator.isEnum(val, RoleId))
            throw new SystemError(MessageError.PARAM_INVALID, 'role');

        this.data.roleId = val;
    }

    get firstName(): string {
        return this.data.firstName;
    }

    set firstName(val: string) {
        if (!val)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'first name');

        val = val.trim();
        if (val.length > 20)
            throw new SystemError(MessageError.PARAM_LEN_LESS_OR_EQUAL, 'first name', 20);

        this.data.firstName = val;
    }

    get lastName(): string | null {
        return this.data.lastName;
    }

    set lastName(val: string | null) {
        if (val) {
            val = val.trim();
            if (val.length > 20)
                throw new SystemError(MessageError.PARAM_LEN_LESS_OR_EQUAL, 'last name', 20);
        }
        this.data.lastName = val;
    }

    get avatar(): string | null {
        return '';
    }

    set avatar(val: string | null) {
        if (val) {
            val = val.trim();
            if (val.length > 100)
                throw new SystemError(MessageError.PARAM_LEN_MAX, 'avatar path', 100);
        }
        this.data.avatar = val;
    }

    get gender(): GenderType | null {
        return this.data.gender;
    }

    set gender(val: GenderType | null) {
        if(val) {
            if(!validator.isEnum(val, GenderType))
                throw new SystemError(MessageError.PARAM_INVALID, 'gender')
        }
        this.data.gender = val;
    }

    get birthday(): string | null {
        return this.data.birthday;
    }

    set birthday(val: string | null) {
        if (val) {
            if (!validator.isDateString(val))
                throw new SystemError(MessageError.PARAM_INVALID, 'birthday');

            if (new Date(val) > new Date())
                throw new SystemError(MessageError.PARAM_INVALID, 'birthday');
        }
        this.data.birthday = val;
    }
    
    get socketIds(): string[] {
        return this.data.socketIds;
    }

    set socketIds(val: string[]) {
        if(val.length) {
            if(!validator.isArray(val))
                throw new SystemError(MessageError.PARAM_INVALID, 'socket ids');
        }

        this.data.socketIds = val;
    }

    /* Handlers */
    static validateAvatarFile(file: Express.Multer.File): void {
        const maxSize = 100 * 100 * 1024; // 100KB
        const formats = ['jpeg', 'jpg', 'png', 'gif'];
        const format = file.mimetype.replace('image/', '');
        if(!formats.includes(format))
            throw new SystemError(MessageError.PARAM_FORMAT_INVALID, 'avatar file', formats.join(', '));
        if(file.size > maxSize)
            throw new SystemError(MessageError.PARAM_SIZE_MAX, 'avatar file', maxSize / 1024, 'KB');
    }

    static getAvatarPath(id: string, ext: string): string {
        return `images/users/${id}/avatar.${ext}`;
    }
}

export class User extends UserBase<IUser> {}