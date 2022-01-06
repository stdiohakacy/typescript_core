import { FindClientFilter, IClientRepository } from './../../../base/repository/IClientRepository';
import { FindClientQueryResult } from './FindClientQueryResult';
import { Inject, Service } from 'typedi';
import { IQueryHandler } from './../../../base/usecase/IQueryHandler';
import { PaginationResult } from './../../PaginationResult';
import { FindClientQuery } from './FindClientQuery';
import { RoleId } from '../../../enums/RoleId';
import { SystemError } from '../../../exceptions/SystemError';
import { MessageError } from '../../../exceptions/MessageError';


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