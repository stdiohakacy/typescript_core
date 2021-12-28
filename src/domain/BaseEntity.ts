import { IBaseEntity } from "./IBaseEntity";

export abstract class BaseEntity<TEntity extends IBaseEntity> implements IBaseEntity {
    constructor(protected readonly data = {} as TEntity) { }

    get createdAt(): Date {
        return this.data.createdAt;
    }

    get updatedAt(): Date {
        return this.data.updatedAt;
    }

    get deletedAt(): Date | undefined {
        return this.data.deletedAt;
    }

    /* Handlers */

    toData(): TEntity {
        return this.data;
    }
}
