import * as crypto from 'crypto';
import { Inject, Service } from "typedi";
import { v4 } from 'uuid';
import { IClientRepository } from '../../../base/repository/IClientRepository';
import { ICommandHandler } from "../../../base/usecase/ICommandHandler";
import { Client } from '../../../domain/client/Client';
import { IClient } from '../../../domain/client/IClient';
import { ClientStatus } from '../../../enums/ClientStatus';
import { RoleId } from '../../../enums/RoleId';
import { addSeconds } from '../../../libs/date';
import { IMailService } from '../../../services/mail/IMailService';
import { CreateAuthByEmailCommand } from '../auth/CreateAuthByEmailCommand';
import { CreateAuthByEmailCommandHandler } from "../auth/CreateAuthByEmailCommandHandler";
import { IAuthRepository } from './../../../base/repository/IAuthRepository';
import { MessageError } from './../../../exceptions/MessageError';
import { SystemError } from './../../../exceptions/SystemError';
import { RegisterClientCommand } from "./RegisterClientCommand";

@Service()
export class RegisterClientCommandHandler implements ICommandHandler<RegisterClientCommand, boolean> {
    @Inject()
    private readonly _createAuthByEmailCommandHandler: CreateAuthByEmailCommandHandler;

    @Inject('auth.repository')
    private readonly _authRepository: IAuthRepository;

    @Inject('client.repository')
    private readonly _clientRepository: IClientRepository;
    
    @Inject('mail.service')
    private readonly _mailService: IMailService;

    async handle(param: RegisterClientCommand): Promise<boolean> {
    try {
        const client = new Client({ id: v4() } as IClient);
        client.firstName = param.firstName;
        client.lastName = param.lastName;
        client.email = param.email;

        const auth = new CreateAuthByEmailCommand();
        auth.userId = client.id;
        auth.email = client.email;
        auth.password = param.password;

        const isEmailExist = await this._clientRepository.checkEmailExist(client.email);
        if(isEmailExist)
            throw new SystemError(MessageError.PARAM_EXISTED, 'email');
        const isUsernameExist = await this._authRepository.getByUsername(client.email);
        if(isUsernameExist)
            throw new SystemError(MessageError.PARAM_EXISTED, 'email');

        client.roleId = RoleId.CLIENT;
        client.status = ClientStatus.INACTIVE;
        client.activeKey = crypto.randomBytes(32).toString('hex');
        client.activeExpire = addSeconds(new Date(), 3 * 24 * 60 * 60);

        const id = await this._clientRepository.create(client);
        if(!id)
            throw new SystemError(MessageError.DATA_CANNOT_SAVE);

        const name = `${client.firstName} ${client.lastName}`;

        this._mailService.sendUserActivation(name, client.email, client.activeKey);
        
        await this._createAuthByEmailCommandHandler.handle(auth);
        return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }
}