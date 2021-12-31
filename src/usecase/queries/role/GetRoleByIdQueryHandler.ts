import { Inject, Service } from "typedi";
import { IRoleRepository } from '../../../base/repository/IRoleRepository';
import { IQueryHandler } from "../../../base/usecase/IQueryHandler";
import { MessageError } from './../../../exceptions/MessageError';
import { SystemError } from './../../../exceptions/SystemError';
import { GetRoleByIdQuery } from './GetRoleByIdQuery';
import { GetRoleByIdQueryResult } from './GetRoleByIdQueryResult';

@Service()
export class GetRoleByIdQueryHandler implements IQueryHandler<GetRoleByIdQuery, GetRoleByIdQueryResult> {
    @Inject('role.repository')
    private readonly _roleRepository: IRoleRepository;

    async handle(param: GetRoleByIdQuery): Promise<GetRoleByIdQueryResult> {
        if(!param.id)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'id');
        const role = await this._roleRepository.getById(param.id);
        if(!role)
            throw new SystemError(MessageError.DATA_NOT_FOUND);
        return new GetRoleByIdQueryResult(role);
    }
}