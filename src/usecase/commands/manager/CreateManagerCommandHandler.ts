import { Inject, Service } from "typedi";
import { v4 } from 'uuid';
import { IAuthRepository } from '../../../base/repository/IAuthRepository';
import { IManagerRepository } from '../../../base/repository/IManagerRepository';
import { IRoleRepository } from '../../../base/repository/IRoleRepository';
import { ICommandHandler } from "../../../base/usecase/ICommandHandler";
import { IManager } from '../../../domain/manager/IManager';
import { ManagerStatus } from "../../../enums/ManagerStatus";
import { RoleId } from '../../../enums/RoleId';
import { CreateAuthByEmailCommand } from "../auth/CreateAuthByEmailCommand";
import { CreateAuthByEmailCommandHandler } from '../auth/CreateAuthByEmailCommandHandler';
import { Manager } from './../../../domain/manager/Manager';
import { MessageError } from './../../../exceptions/MessageError';
import { SystemError } from './../../../exceptions/SystemError';
import { CreateManagerCommand } from "./CreateManagerCommand";

@Service()
export class CreateManagerCommandHandler implements ICommandHandler<CreateManagerCommand, string> {
    @Inject()
    private readonly _createAuthByEmailCommandHandler: CreateAuthByEmailCommandHandler

    @Inject('manager.repository')
    private readonly _managerRepository: IManagerRepository

    @Inject('auth.repository')
    private readonly _authRepository: IAuthRepository

    @Inject('role.repository')
    private readonly _roleRepository: IRoleRepository;

    async handle(param: CreateManagerCommand): Promise<string> {
        if(param.roleAuthId !== RoleId.SUPER_ADMIN)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'permission');
        
        const manager = new Manager({id: v4()} as IManager);
        manager.roleId = RoleId.MANAGER;
        manager.status = ManagerStatus.ACTIVATED;
        manager.firstName = param.firstName;
        manager.lastName = param.lastName;
        manager.email = param.email;

        const auth = new CreateAuthByEmailCommand();
        auth.userId = manager.id;
        auth.email = manager.email;
        auth.password = param.password;

        const isEmailExist = await this._authRepository.getByUsername(param.email);
        if(isEmailExist)
            throw new SystemError(MessageError.PARAM_EXISTED, 'email');
        const isUsernameExist = await this._authRepository.getByUsername(param.email);
        if(isUsernameExist)
            throw new SystemError(MessageError.PARAM_EXISTED, 'email');
        const role = await this._roleRepository.getById(manager.roleId);
        if(!role)
            throw new SystemError(MessageError.PARAM_NOT_EXISTS, 'role');
        const id = await this._managerRepository.create(manager);
        if(!id)
            throw new SystemError(MessageError.DATA_CANNOT_SAVE);

        await this._createAuthByEmailCommandHandler.handle(auth);
        return id;
    }
}