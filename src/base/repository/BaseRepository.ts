import { IBaseRepository } from './IBaseRepository';
import { IBaseEntity } from "../../domain/IBaseEntity";
import { BaseDbEntity } from "../entity/BaseDbEntity";
import { Inject } from 'typedi';
import { IDbContext } from '../../database/IDbContext';
import { Repository, getRepository, QueryRunner } from 'typeorm';
import { IDbQueryRunner } from '../../database/IDbQueryRunner';

export abstract class BaseRepository<TEntity extends IBaseEntity, TDbEntity extends BaseDbEntity<TEntity>, TIdentityType> implements IBaseRepository<TEntity, TIdentityType> {
    @Inject("db.context")
    protected readonly dbContext: IDbContext;

    protected readonly repository: Repository<TDbEntity>;
    constructor(
        private _type: { new(): TDbEntity }, 
        private _schema: { TABLE_NAME: string }
    ) {
        this.repository = getRepository(this._type);
    }
    async create(data: TEntity, queryRunner: IDbQueryRunner | null = null): Promise<TIdentityType | null> {
        const result = await this.repository.createQueryBuilder(this._schema.TABLE_NAME, queryRunner as QueryRunner)
        .insert()
        .values(new this._type().fromEntity(data) as any)
        .execute();
        return result?.identifiers[0].id;
    }
}