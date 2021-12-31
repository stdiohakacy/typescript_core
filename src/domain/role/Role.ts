import { SystemError } from './../../exceptions/SystemError';
import { BaseEntity } from "../../base/entity/BaseEntity";
import { IRole } from "./IRole";
import { MessageError } from '../../exceptions/MessageError';

export class Role extends BaseEntity<IRole> implements IRole {
    constructor(data?: IRole) {
        super(data);
    }
    get id(): string {
        return this.data.id;
    }
    
    get name(): string {
        return this.data.name;
    }

    set name(val: string) {
        if(!val) 
            throw new SystemError(MessageError.PARAM_LEN_EQUAL, 'name');
        if(val.length > 50)
            throw new SystemError(MessageError.PARAM_LEN_LESS_OR_EQUAL, 'name', 50);
        this.data.name = val;
    }
}