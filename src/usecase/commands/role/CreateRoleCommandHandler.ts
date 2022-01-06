import { Inject, Service } from "typedi";
import { IRoleRepository } from "../../../base/repository/IRoleRepository";
import { ICommandHandler } from "../../../base/usecase/ICommandHandler";
import { Role } from "../../../domain/role/Role";
import { SystemError } from "../../../exceptions/SystemError";
import { MessageError } from './../../../exceptions/MessageError';
import { CreateRoleCommand } from "./CreateRoleCommand";

@Service()
export class CreateRoleCommandHandler implements ICommandHandler<CreateRoleCommand, string> {
    @Inject('role.repository')
    private readonly _roleRepository: IRoleRepository;

    async handle(param: CreateRoleCommand): Promise<string> {
        const role = new Role();
        role.name = param.name;

        const isExist = await this._roleRepository.checkNameExist(role.name);
        if(isExist)
            throw new SystemError(MessageError.PARAM_EXISTED, 'name');
        const id = await this._roleRepository.create(role);
        if(!id)
            throw new SystemError(MessageError.DATA_CANNOT_SAVE);
        return id;
    }
}