import { Inject, Service } from "typedi";
import { FindManagerFilter, IManagerRepository } from '../../../base/repository/IManagerRepository';
import { PaginationResult } from "../../PaginationResult";
import { IQueryHandler } from './../../../base/usecase/IQueryHandler';
import { MessageError } from './../../../exceptions/MessageError';
import { SystemError } from './../../../exceptions/SystemError';
import { FindManagerQuery } from './FindManagerQuery';
import { FindManagerQueryResult } from "./FindManagerQueryResult";

@Service()
export class FindManagerQueryHandler implements IQueryHandler<FindManagerQuery, PaginationResult<FindManagerQueryResult>> {
    @Inject('manager.repository')
    private readonly _managerRepository: IManagerRepository;

    async handle(param: FindManagerQuery): Promise<PaginationResult<FindManagerQueryResult>> {
        if (!param.roleAuthId)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'permission');

        const filter = new FindManagerFilter();
        filter.setPagination(param.skip, param.limit);
        filter.keyword = param.keyword;
        filter.status = param.status;

        const [managers, count] = await this._managerRepository.findAndCount(filter);
        const list = managers.map(manager => new FindManagerQueryResult(manager));

        return new PaginationResult(list, count, param.skip, param.limit);
    }
}