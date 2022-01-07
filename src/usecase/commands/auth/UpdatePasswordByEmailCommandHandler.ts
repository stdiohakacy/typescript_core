import { MessageError } from './../../../exceptions/MessageError';
import { SystemError } from './../../../exceptions/SystemError';
import { Inject, Service } from "typedi";
import { IAuthRepository } from "../../../base/repository/IAuthRepository";
import { ICommandHandler } from "../../../base/usecase/ICommandHandler";
import { UpdatePasswordByEmailCommand } from "./UpdatePasswordByEmailCommand";
import { Auth } from '../../../domain/auth/Auth';
import { AuthType } from '../../../enums/AuthType';

@Service()
export class UpdatePasswordByEmailCommandHandler implements ICommandHandler<UpdatePasswordByEmailCommand, boolean> {
    @Inject('auth.repository')
    private readonly _authRepository: IAuthRepository;

    async handle(param: UpdatePasswordByEmailCommand): Promise<boolean> {
        if(!param.userAuthId)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'permission');
        
        const data = new Auth();
        data.password = param.password;

        const auths = await this._authRepository.getAllByUser(param.userAuthId);
        const auth = auths.find(auth => auth.type === AuthType.PERSONAL_EMAIL && auth.comparePassword(param.oldPassword));

        if(!auth)
            throw new SystemError(MessageError.PARAM_INCORRECT, 'old password');
        const hasSucceed = await this._authRepository.update(auth.id, data);
        if(!hasSucceed)
            throw new SystemError(MessageError.DATA_CANNOT_SAVE);
        return hasSucceed;
    }
}