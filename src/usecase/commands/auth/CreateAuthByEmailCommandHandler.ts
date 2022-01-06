import { Inject, Service } from "typedi";
import { IUserRepository } from '../../../base/repository/IUserRepository';
import { ICommandHandler } from "../../../base/usecase/ICommandHandler";
import { AuthType } from '../../../enums/AuthType';
import { MessageError } from '../../../exceptions/MessageError';
import { SystemError } from '../../../exceptions/SystemError';
import { IAuthRepository } from './../../../base/repository/IAuthRepository';
import { Auth } from './../../../domain/auth/Auth';
import { CreateAuthByEmailCommand } from './CreateAuthByEmailCommand';

@Service()
export class CreateAuthByEmailCommandHandler implements ICommandHandler<CreateAuthByEmailCommand, string> {
    @Inject('user.repository')
    private readonly _userRepository: IUserRepository;

    @Inject('auth.repository')
    private readonly _authRepository: IAuthRepository;

    async handle(param: CreateAuthByEmailCommand): Promise<string> {
        const auth = new Auth();
        auth.userId = param.userId;
        auth.type = AuthType.PERSONAL_EMAIL;
        auth.username = param.email;
        auth.password = param.password;

        const user = await this._userRepository.getById(param.userId);
        if(!user)
            throw new SystemError(MessageError.PARAM_NOT_EXISTS, 'user')

        const auths = await this._authRepository.getAllByUser(param.userId);
        if(auths && auths.find(auth => auth.type === AuthType.PERSONAL_EMAIL))
            throw new SystemError(MessageError.PARAM_EXISTED, 'data');
        const id = await this._authRepository.create(auth);
        if(!id)
            throw new SystemError(MessageError.DATA_CANNOT_SAVE);
        return id;
    }
}