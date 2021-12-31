import { Inject, Service } from "typedi";
import { IRoleRepository } from "../../../base/repository/IRoleRepository";
import { ICommandHandler } from "../../../base/usecase/ICommandHandler";
import { MessageError } from './../../../exceptions/MessageError';
import { SystemError } from './../../../exceptions/SystemError';
import { DeleteRoleCommand } from "./DeleteRoleCommand";

@Service()
export class DeleteRoleCommandHandler implements ICommandHandler<DeleteRoleCommand, boolean> {
    @Inject('role.repository')
    private readonly _roleRepository: IRoleRepository;

    async handle(param: DeleteRoleCommand): Promise<boolean> {
        if(!param.id)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'id');
        
        const role = await this._roleRepository.getById(param.id);
        if(!role)
            throw new SystemError(MessageError.PARAM_NOT_EXISTS, 'role');
        const hasSucceed = await this._roleRepository.softDelete(param.id);
        if(!hasSucceed)
            throw new SystemError(MessageError.DATA_CANNOT_SAVE);
        return hasSucceed;
    }
}