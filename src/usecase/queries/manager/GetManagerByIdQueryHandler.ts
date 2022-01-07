import { MessageError } from './../../../exceptions/MessageError';
import { SystemError } from './../../../exceptions/SystemError';
import { RoleId } from './../../../enums/RoleId';
import { GetManagerByIdQueryResult } from './GetManagerByIdQueryResult';
import { GetManagerByIdQuery } from './GetManagerByIdQuery';
import { Inject, Service } from "typedi";
import { IQueryHandler } from "../../../base/usecase/IQueryHandler";
import { IManagerRepository } from '../../../base/repository/IManagerRepository';

@Service()
export class GetManagerByIdQueryHandler implements IQueryHandler<GetManagerByIdQuery, GetManagerByIdQueryResult> {
    @Inject('manager.repository')
    private readonly _managerRepository: IManagerRepository

    async handle(param: GetManagerByIdQuery): Promise<GetManagerByIdQueryResult>{
        if(param.roleAuthId !== RoleId.SUPER_ADMIN)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'permission');
        if(!param.id)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'id');
        const manager = await this._managerRepository.getById(param.id);
        if(!manager)
            throw new SystemError(MessageError.DATA_NOT_FOUND);
        return new GetManagerByIdQueryResult(manager);
    }
}