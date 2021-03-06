import { Inject, Service } from 'typedi';
import { IClientRepository } from './../../../base/repository/IClientRepository';
import { IQueryHandler } from './../../../base/usecase/IQueryHandler';
import { RoleId } from './../../../enums/RoleId';
import { MessageError } from './../../../exceptions/MessageError';
import { SystemError } from './../../../exceptions/SystemError';
import { GetClientByIdQuery } from './GetClientByIdQuery';
import { GetClientByIdQueryResult } from './GetClientByIdQueryResult';

@Service()
export class GetClientByIdQueryHandler implements IQueryHandler<GetClientByIdQuery, GetClientByIdQueryResult> {
    @Inject('client.repository')
    private readonly _clientRepository: IClientRepository;

    async handle(param: GetClientByIdQuery): Promise<GetClientByIdQueryResult> {
        if(![RoleId.SUPER_ADMIN, RoleId.MANAGER].includes(param.roleAuthId))
            throw new SystemError(MessageError.PARAM_REQUIRED, 'permission');
        if(!param.id)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'id');
        const client = await this._clientRepository.getById(param.id);
        if(!client)
            throw new SystemError(MessageError.DATA_NOT_FOUND);
        return new GetClientByIdQueryResult(client);
    }
}