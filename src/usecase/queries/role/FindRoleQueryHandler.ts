import { Inject, Service } from "typedi";
import { FindRoleFilter, IRoleRepository } from "../../../base/repository/IRoleRepository";
import { IQueryHandler } from "../../../base/usecase/IQueryHandler";
import { PaginationResult } from "../../PanigationResult";
import { FindRoleQuery } from "./FindRoleQuery";
import { FindRoleQueryResult } from "./FindRoleQueryResult";

@Service()
export class FindRoleQueryHandler implements IQueryHandler<FindRoleQuery, PaginationResult<FindRoleQueryResult>> {
    @Inject("role.repository")
    private readonly _roleRepository: IRoleRepository;

    async handle(param: FindRoleQuery): Promise<PaginationResult<FindRoleQueryResult>> {
        const { skip, limit, keyword } = param;
        const filter = new FindRoleFilter();
        filter.setPagination(skip, limit);
        filter.keyword = keyword;

        const [roles, count] = await this._roleRepository.findAndCount(filter);
        const list = roles.map(role => new FindRoleQueryResult(role));
        return new PaginationResult(list, count, skip, limit);
    }
}