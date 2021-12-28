import { LogicalError } from '../exceptions/LogicalError';
import { MessageError } from '../exceptions/MessageError';
import { BaseEntity } from './BaseEntity';
import { ICategory } from './ICategory';

export class Category extends BaseEntity<ICategory> implements ICategory {
    constructor(data?: ICategory) {
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
            throw new LogicalError(MessageError.PARAM_REQUIRED, 'name');

        if (val.length > 50)
            throw new LogicalError(MessageError.PARAM_LEN_LESS_OR_EQUAL, 'name', 50);

        this.data.name = val;
    }

    /* Relationship */
}
