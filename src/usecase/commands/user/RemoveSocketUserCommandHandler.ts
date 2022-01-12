import { MessageError } from './../../../exceptions/MessageError';
import { SystemError } from './../../../exceptions/SystemError';
import { RemoveSocketUserCommand } from './RemoveSocketUserCommand';
import { ICommandHandler } from "../../../base/usecase/ICommandHandler";
import { Inject, Service } from 'typedi';
import { IUserRepository } from '../../../base/repository/IUserRepository';

@Service()
export class RemoveSocketUserCommandHandler implements ICommandHandler<RemoveSocketUserCommand, boolean> {
    @Inject('user.repository')
    private readonly _userRepository: IUserRepository;

    async handle(param: RemoveSocketUserCommand): Promise<boolean> {
        if(!param.userId)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'user');
        if(!param.socketId)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'socket');
        const user = await this._userRepository.getById(param.userId);
        if(!user)
            throw new SystemError(MessageError.PARAM_NOT_FOUND, 'user');
        user.socketIds = user.socketIds.filter(socketId => socketId !== param.socketId);
        const hasSucceed = await this._userRepository.update(param.userId, user);
        if(!hasSucceed)
            throw new SystemError(MessageError.DATA_CANNOT_SAVE);
        return hasSucceed;
    }
}