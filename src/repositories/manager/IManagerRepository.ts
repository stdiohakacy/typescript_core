import { IBaseRepository } from "../../base/repository/IBaseRepository";
import { DbPagination } from "../../database/DbPagination";
import { IDbQueryRunner } from "../../database/IDbQueryRunner";
import { Manager } from "../../domain/manager/Manager";
import { ManagerStatus } from "../../enums/ManagerStatus";


export class FindManagerFilter extends DbPagination {
    keyword: string | null;
    status: ManagerStatus | null;
}

export interface IManagerRepository extends IBaseRepository<Manager, string> {
    findAndCount(param: FindManagerFilter): Promise<[Manager[], number]>;

    getByEmail(email: string): Promise<Manager | undefined>;
    getByEmail(email: string, queryRunner: IDbQueryRunner): Promise<Manager | undefined>;

    checkEmailExist(email: string): Promise<boolean>;
    checkEmailExist(email: string, queryRunner: IDbQueryRunner): Promise<boolean>;
}