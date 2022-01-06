import { Inject, Service } from "typedi";
import { IRoleRepository } from "../../../base/repository/IRoleRepository";
import { ICommandHandler } from "../../../base/usecase/ICommandHandler";
import { Role } from '../../../domain/role/Role';
import { MessageError } from './../../../exceptions/MessageError';
import { SystemError } from './../../../exceptions/SystemError';
import { UpdateRoleCommand } from "./UpdateRoleCommand";

@Service()
export class UpdateRoleCommandHandler implements ICommandHandler<UpdateRoleCommand, boolean> {
    @Inject('role.repository')
    private readonly _roleRepository: IRoleRepository;

    async handle(param: UpdateRoleCommand): Promise<boolean> {
        if (!param.id)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'id');

        const data = new Role();
        data.name = param.name;

        const role = await this._roleRepository.getById(param.id);
        if (!role)
            throw new SystemError(MessageError.PARAM_NOT_EXISTS, 'role');

        const isExist = await this._roleRepository.checkNameExist(data.name, param.id);
        if (isExist)
            throw new SystemError(MessageError.PARAM_EXISTED, 'name');

        const hasSucceed = await this._roleRepository.update(param.id, data);
        if (!hasSucceed)
            throw new SystemError(MessageError.DATA_CANNOT_SAVE);

        return hasSucceed;
    }
}