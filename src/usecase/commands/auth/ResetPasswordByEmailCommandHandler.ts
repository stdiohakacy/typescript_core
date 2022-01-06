import { Auth } from './../../../domain/auth/Auth';
import { MessageError } from './../../../exceptions/MessageError';
import { SystemError } from './../../../exceptions/SystemError';
import { Inject, Service } from "typedi";
import { IAuthRepository } from "../../../base/repository/IAuthRepository";
import { IClientRepository } from "../../../base/repository/IClientRepository";
import { IManagerRepository } from "../../../base/repository/IManagerRepository";
import { ICommandHandler } from "../../../base/usecase/ICommandHandler";
import { ResetPasswordByEmailCommand } from "./ResetPasswordByEmailCommand";
import { RoleId } from '../../../enums/RoleId';
import { ClientStatus } from '../../../enums/ClientStatus';
import { ManagerStatus } from '../../../enums/ManagerStatus';


@Service()
export class ResetPasswordByEmailCommandHandler implements ICommandHandler<ResetPasswordByEmailCommand, boolean> {
    @Inject('auth.repository')
    private readonly _authRepository: IAuthRepository;

    @Inject('client.repository')
    private readonly _clientRepository: IClientRepository;

    @Inject('manager.repository')
    private readonly _managerRepository: IManagerRepository;

    async handle(param: ResetPasswordByEmailCommand): Promise<boolean> {
        if(!param.forgotKey)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'forgot key');
        if(!param.email)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'email');
        if(!param.password)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'password');
        const auth = await this._authRepository.getByUsername(param.email);
        if(!auth)
            throw new SystemError(MessageError.PARAM_NOT_EXISTS, 'account');
        if(auth.user?.roleId === RoleId.CLIENT) {
            const client = await this._clientRepository.getById(auth.userId);
            if(!client)
                throw new SystemError(MessageError.PARAM_NOT_EXISTS, 'account')
            if(client.status !== ClientStatus.ACTIVATED)
                throw new SystemError(MessageError.PARAM_NOT_ACTIVATED, 'account');
        } else {
            const manager = await this._managerRepository.getById(auth.userId);
            if (!manager)
                throw new SystemError(MessageError.PARAM_NOT_EXISTS, 'account');
            if (manager.status !== ManagerStatus.ACTIVATED)
                throw new SystemError(MessageError.PARAM_NOT_ACTIVATED, 'account');
        }

        if(auth.forgotKey !== param.forgotKey)
            throw new SystemError(MessageError.PARAM_INCORRECT, 'forgot key');
        if (!auth.forgotExpire || auth.forgotExpire < new Date())
            throw new SystemError(MessageError.PARAM_EXPIRED, 'forgot key');

        const data = new Auth();
        data.password = param.password;
        data.forgotKey = null;
        data.forgotExpire = null;

        const hasSucceed = await this._authRepository.update(auth.id, data);
        if(!hasSucceed)
            throw new SystemError(MessageError.DATA_CANNOT_SAVE);
        return hasSucceed;
    }
}