import { IDbQueryRunner } from "../../database/IDbQueryRunner";

export interface IBaseRepository<TEntity, TIdentityType> {
    create(data: TEntity): Promise<TIdentityType | null>;
    create(data: TEntity, queryRunner: IDbQueryRunner): Promise<TIdentityType | null>;
}