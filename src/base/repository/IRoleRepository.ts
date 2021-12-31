import { Role } from './../../domain/role/Role';
import { IBaseRepository } from './IBaseRepository';
import { DbPagination } from './../../database/DbPagination';

export class FindRoleFilter extends DbPagination {
    keyword: string | null;
}

export class FindRoleCommonFilter extends DbPagination {
    keyword: string | null;
}

export interface IRoleRepository extends IBaseRepository<Role, string> {
    getAll(): Promise<Role[]>;
    getAll(expireTimeCaching: number): Promise<Role[]>;
    findAndCount(param: FindRoleFilter): Promise<[Role[], number]>;
    findCommonAndCount(filter: FindRoleCommonFilter): Promise<[Role[], number]>;
    checkNameExist(name: string): Promise<boolean>;
    checkNameExist(name: string, excludeId: string): Promise<boolean>;
}