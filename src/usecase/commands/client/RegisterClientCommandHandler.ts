import { MessageError } from './../../../exceptions/MessageError';
import { SystemError } from './../../../exceptions/SystemError';
import { IAuthRepository } from './../../../base/repository/IAuthRepository';
import { Inject, Service } from "typedi";
import { ICommandHandler } from "../../../base/usecase/ICommandHandler";
import { CreateAuthByEmailCommandHandler } from "../auth/CreateAuthByEmailCommandHandler";
import { RegisterClientCommand } from "./RegisterClientCommand";
import { IClientRepository } from '../../../base/repository/IClientRepository';
import { Client } from '../../../domain/client/Client';
import { v4 } from 'uuid'
import { IClient } from '../../../domain/client/IClient';
import { CreateAuthByEmailCommand } from '../auth/CreateAuthByEmailCommand';
import { RoleId } from '../../../enums/RoleId';
import { ClientStatus } from '../../../enums/ClientStatus';
import * as crypto from 'crypto';
import { addSeconds } from '../../../libs/date';

@Service()
export class RegisterClientCommandHandler implements ICommandHandler<RegisterClientCommand, boolean> {
    @Inject()
    private readonly _createAuthByEmailCommandHandler: CreateAuthByEmailCommandHandler;

    @Inject('auth.repository')
    private readonly _authRepository: IAuthRepository;

    @Inject('client.repository')
    private readonly _clientRepository: IClientRepository;

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
        
        await this._createAuthByEmailCommandHandler.handle(auth);
        return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }
}