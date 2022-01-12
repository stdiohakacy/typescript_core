import { Inject, Service } from "typedi";
import { IUserRepository } from '../../../base/repository/IUserRepository';
import { ICommandHandler } from "../../../base/usecase/ICommandHandler";
import { MessageError } from '../../../exceptions/MessageError';
import { SystemError } from '../../../exceptions/SystemError';
import { AddSocketUserCommand } from './AddSocketUserCommand';

@Service()
export class AddSocketUserCommandHandler implements ICommandHandler<AddSocketUserCommand, boolean> {
    @Inject('user.repository')
    private readonly _userRepository: IUserRepository;

    async handle(param: AddSocketUserCommand): Promise<boolean> {
        if(!param.userId)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'user');
        if(!param.socketId)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'socket');
        
        const user = await this._userRepository.getById(param.userId);
        if(!user)
            throw new SystemError(MessageError.DATA_NOT_FOUND);
        if(!user.socketIds || !user.socketIds.length)
            user.socketIds = [param.socketId];
        else 
            user.socketIds.push(param.socketId);

        const hasSucceed = await this._userRepository.update(param.userId, user);
        if(!hasSucceed)
            throw new SystemError(MessageError.DATA_CANNOT_SAVE);
        return hasSucceed;
    }
}