import { IMailService } from './../../../services/mail/IMailService';
import { Client } from './../../../domain/client/Client';
import { ClientStatus } from './../../../enums/ClientStatus';
import * as validator from 'class-validator';
import { Inject, Service } from 'typedi';
import { IClientRepository } from './../../../base/repository/IClientRepository';
import { ICommandHandler } from './../../../base/usecase/ICommandHandler';
import { MessageError } from './../../../exceptions/MessageError';
import { SystemError } from './../../../exceptions/SystemError';
import { ResendActivationCommand } from './ResendActivationCommand';
import * as crypto from 'crypto';
import { addSeconds } from '../../../libs/date';

@Service()
export class ResendActivationCommandHandler implements ICommandHandler<ResendActivationCommand, boolean> {
    @Inject('client.repository')
    private readonly _clientRepository: IClientRepository;

    @Inject('mail.service')
    private readonly _mailService: IMailService;

    async handle(param: ResendActivationCommand): Promise<boolean> {
        if(!param.email)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'email');
        if(!validator.isEmail(param.email))
            throw new SystemError(MessageError.PARAM_INVALID, 'email');
        
        const client = await this._clientRepository.getByEmail(param.email);
        if(!client || client.status === ClientStatus.ACTIVATED)
            throw new SystemError(MessageError.DATA_INVALID);

        const data = new Client();
        data.activeKey = crypto.randomBytes(32).toString('hex');
        data.activeExpire = addSeconds(new Date(), 3 * 24 * 60 * 60);

        const hasSucceed = this._clientRepository.update(client.id, data);
        if(!hasSucceed)
            throw new SystemError(MessageError.DATA_CANNOT_SAVE);

        const name = `${client.firstName} ${client.lastName}`;
        this._mailService.resendUserActivation(name, client.email, data.activeKey);

        return hasSucceed;
    }
}