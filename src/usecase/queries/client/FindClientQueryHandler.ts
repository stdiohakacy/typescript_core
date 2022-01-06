import { Inject, Service } from 'typedi';
import { RoleId } from '../../../enums/RoleId';
import { MessageError } from '../../../exceptions/MessageError';
import { SystemError } from '../../../exceptions/SystemError';
import { FindClientFilter, IClientRepository } from './../../../base/repository/IClientRepository';
import { IQueryHandler } from './../../../base/usecase/IQueryHandler';
import { PaginationResult } from './../../PaginationResult';
import { FindClientQuery } from './FindClientQuery';
import { FindClientQueryResult } from './FindClientQueryResult';


@Service()
export class FindClientQueryHandler implements IQueryHandler<FindClientQuery, PaginationResult<FindClientQueryResult>> {
    @Inject('client.repository')
    private readonly _clientRepository: IClientRepository;

    async handle(param: FindClientQuery): Promise<PaginationResult<FindClientQueryResult>> {
        if (![RoleId.SUPER_ADMIN, RoleId.MANAGER].includes(param.roleAuthId))
            throw new SystemError(MessageError.PARAM_REQUIRED, 'permission');

        const filter = new FindClientFilter();
        filter.setPagination(param.skip, param.limit);
        filter.keyword = param.keyword;
        filter.status = param.status;

        const [clients, count] = await this._clientRepository.findAndCount(filter);
        const list = clients.map(client => new FindClientQueryResult(client));

        return new PaginationResult(list, count, param.skip, param.limit);
    }
}