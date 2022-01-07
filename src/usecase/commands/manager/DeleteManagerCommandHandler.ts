import { MessageError } from './../../../exceptions/MessageError';
import { SystemError } from './../../../exceptions/SystemError';
import { DeleteManagerCommand } from './DeleteManagerCommand';
import { Inject, Service } from "typedi";
import { ICommandHandler } from "../../../base/usecase/ICommandHandler";
import { IManagerRepository } from '../../../base/repository/IManagerRepository';
import { RoleId } from '../../../enums/RoleId';

@Service()
export class DeleteManagerCommandHandler implements ICommandHandler<DeleteManagerCommand, boolean> {
    @Inject('manager.repository')
    private readonly _managerRepository: IManagerRepository

    async handle(param: DeleteManagerCommand): Promise<boolean> {
        if(param.roleAuthId !== RoleId.SUPER_ADMIN)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'permission');
        if(!param.id)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'id');
        const manager = await this._managerRepository.getById(param.id);
        if(!manager)
            throw new SystemError(MessageError.DATA_NOT_FOUND);
        const hasSucceed = await this._managerRepository.softDelete(param.id);
        if(!hasSucceed)
            throw new SystemError(MessageError.DATA_CANNOT_SAVE);
        return hasSucceed;
    }
}