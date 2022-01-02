import { ClientStatus } from './../../enums/ClientStatus';
import { DbPagination } from "../../database/DbPagination";
import { IBaseRepository } from '../../base/repository/IBaseRepository';
import { Client } from '../../domain/client/Client';
import { IDbQueryRunner } from '../../database/IDbQueryRunner';

export class FindClientFilter extends DbPagination {
    keyword: string | null;
    status: ClientStatus | null;
}

export interface IClientRepository extends IBaseRepository<Client, string> {
    findAndCount(param: FindClientFilter): Promise<[Client[], number]>;
    
    getByEmail(email: string): Promise<Client | undefined>;
    getByEmail(email: string, queryRunner: IDbQueryRunner): Promise<Client | undefined>;

    checkEmailExist(email: string): Promise<boolean>;
    checkEmailExist(email: string, queryRunner: IDbQueryRunner): Promise<boolean>
}