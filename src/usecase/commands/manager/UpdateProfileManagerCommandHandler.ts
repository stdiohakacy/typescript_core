import { Inject, Service } from 'typedi';
import { IManagerRepository } from '../../../base/repository/IManagerRepository';
import { ICommandHandler } from '../../../base/usecase/ICommandHandler';
import { Manager } from '../../../domain/manager/Manager';
import { MessageError } from '../../../exceptions/MessageError';
import { SystemError } from '../../../exceptions/SystemError';
import { UpdateProfileManagerCommand } from './UpdateProfileManagerCommand';

@Service()
export class UpdateProfileManagerCommandHandler implements ICommandHandler<UpdateProfileManagerCommand, boolean> {
    @Inject('manager.repository')
    private readonly _managerRepository: IManagerRepository;

    async handle(param: UpdateProfileManagerCommand): Promise<boolean> {
        if(!param.userAuthId)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'permission');
        const data = new Manager();
        data.firstName = param.firstName;
        data.lastName = param.lastName;

        const hasSucceed = await this._managerRepository.update(param.userAuthId, data);
        if(!hasSucceed)
            throw new SystemError(MessageError.DATA_CANNOT_SAVE);
        return hasSucceed;
    }
}