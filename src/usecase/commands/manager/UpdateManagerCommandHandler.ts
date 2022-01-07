import { Manager } from './../../../domain/manager/Manager';
import { MessageError } from './../../../exceptions/MessageError';
import { SystemError } from './../../../exceptions/SystemError';
import { UpdateManagerCommand } from './UpdateManagerCommand';
import { Inject, Service } from "typedi";
import { ICommandHandler } from "../../../base/usecase/ICommandHandler";
import { IManagerRepository } from '../../../base/repository/IManagerRepository';
import { RoleId } from '../../../enums/RoleId';

@Service()
export class UpdateManagerCommandHandler implements ICommandHandler<UpdateManagerCommand, boolean> {
    constructor(
        @Inject('manager.repository')
        private readonly _managerRepository: IManagerRepository,
    ) {}

    async handle(param: UpdateManagerCommand): Promise<boolean> {
        if(param.roleAuthId !== RoleId.SUPER_ADMIN)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'permission');
        if(!param.id)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'id');
        
        const id = param.id;
        const data = new Manager();
        data.firstName = param.firstName;
        data.lastName = param.lastName;

        const manager = await this._managerRepository.getById(id);
        if (!manager)
            throw new SystemError(MessageError.DATA_NOT_FOUND);
        const hasSucceed = await this._managerRepository.update(id, data);
        if (!hasSucceed)
            throw new SystemError(MessageError.DATA_CANNOT_SAVE);

        return hasSucceed;
    }
}