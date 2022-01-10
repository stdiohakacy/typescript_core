import { MessageError } from './../../../exceptions/MessageError';
import { SystemError } from './../../../exceptions/SystemError';
import { ArchiveManagerCommand } from './ArchiveManagerCommand';
import { Inject, Service } from "typedi";
import { ICommandHandler } from "../../../base/usecase/ICommandHandler";
import { IManagerRepository } from '../../../base/repository/IManagerRepository';
import { RoleId } from '../../../enums/RoleId';
import { Manager } from '../../../domain/manager/Manager';
import { ManagerStatus } from '../../../enums/ManagerStatus';

@Service()
export class ArchiveManagerCommandHandler implements ICommandHandler<ArchiveManagerCommand, boolean> {
    @Inject("manager.repository")
    private readonly _managerRepository: IManagerRepository;

    async handle(param: ArchiveManagerCommand): Promise<boolean> {
        if(param.roleAuthId !== RoleId.SUPER_ADMIN)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'permission');
        if(!param.id)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'id');
        const manager = await this._managerRepository.getById(param.id);
        if(!manager)
            throw new SystemError(MessageError.DATA_NOT_FOUND);
        
        const data = new Manager();
        data.status = ManagerStatus.ARCHIVED;
        data.archivedAt = new Date();

        const hasSucceed = await this._managerRepository.update(param.id, data);
        if(!hasSucceed)
            throw new SystemError(MessageError.DATA_CANNOT_SAVE);
        return hasSucceed;
    }
}