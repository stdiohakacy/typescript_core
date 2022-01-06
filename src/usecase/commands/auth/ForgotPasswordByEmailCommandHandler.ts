import * as crypto from 'crypto';
import { Inject, Service } from "typedi";
import { IAuthRepository } from '../../../base/repository/IAuthRepository';
import { IClientRepository } from '../../../base/repository/IClientRepository';
import { IManagerRepository } from '../../../base/repository/IManagerRepository';
import { ICommandHandler } from "../../../base/usecase/ICommandHandler";
import { Auth } from '../../../domain/auth/Auth';
import { ClientStatus } from '../../../enums/ClientStatus';
import { ManagerStatus } from '../../../enums/ManagerStatus';
import { RoleId } from '../../../enums/RoleId';
import { MessageError } from '../../../exceptions/MessageError';
import { addSeconds } from '../../../libs/date';
import { IMailService } from '../../../services/mail/IMailService';
import { SystemError } from './../../../exceptions/SystemError';
import { ForgotPasswordByEmailCommand } from './ForgotPasswordByEmailCommand';

@Service()
export class ForgotPasswordByEmailCommandHandler implements ICommandHandler<ForgotPasswordByEmailCommand, boolean> {
    @Inject('client.repository')
    private readonly _clientRepository: IClientRepository;

    @Inject('auth.repository')
    private readonly _authRepository: IAuthRepository;

    @Inject('manager.repository')
    private readonly _managerRepository: IManagerRepository;

    @Inject('mail.service')
    private readonly _mailService: IMailService;

    async handle(param: ForgotPasswordByEmailCommand): Promise<boolean> {
        if(!param.email)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'email');

        const auth = await this._authRepository.getByUsername(param.email);
        if(!auth || !auth.user)
            throw new SystemError(MessageError.PARAM_NOT_EXISTS, 'account');
        if(auth.user.roleId === RoleId.CLIENT) {
            const client = await this._clientRepository.getById(auth.userId);
            if(!client)
                throw new SystemError(MessageError.PARAM_NOT_EXISTS, 'account');
            if(client.status !== ClientStatus.ACTIVATED)
                throw new SystemError(MessageError.PARAM_NOT_ACTIVATED, 'account');
        } else {
            const manager = await this._managerRepository.getById(auth.userId);
            if (!manager)
                throw new SystemError(MessageError.PARAM_NOT_EXISTS, 'account');
            if (manager.status !== ManagerStatus.ACTIVATED)
                throw new SystemError(MessageError.PARAM_NOT_ACTIVATED, 'account');
        }

        const data = new Auth();
        data.forgotKey = crypto.randomBytes(32).toString('hex');
        data.forgotExpire = addSeconds(new Date(), 3 * 24 * 60 * 60);

        const hasSucceed = await this._authRepository.update(auth.id, data);
        if(!hasSucceed)
            throw new SystemError(MessageError.DATA_CANNOT_SAVE);
        const name = `${auth.user.firstName} ${auth.user.lastName}`
        this._mailService.sendForgotPassword(name, param.email, data.forgotKey);
        return hasSucceed;
    }
}