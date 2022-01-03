import { Inject } from 'typedi';
import { v4 } from 'uuid';
import { IAuthRepository } from '../../../base/repository/IAuthRepository';
import { IClientRepository } from '../../../base/repository/IClientRepository';
import { ICommandHandler } from "../../../base/usecase/ICommandHandler";
import { Client } from '../../../domain/client/Client';
import { IClient } from '../../../domain/client/IClient';
import { ClientStatus } from '../../../enums/ClientStatus';
import { RoleId } from "../../../enums/RoleId";
import { CreateAuthByEmailCommand } from '../auth/CreateAuthByEmailCommand';
import { CreateAuthByEmailCommandHandler } from '../auth/CreateAuthByEmailCommandHandler';
import { MessageError } from './../../../exceptions/MessageError';
import { SystemError } from './../../../exceptions/SystemError';
import { CreateClientCommand } from "./CreateClientCommand";

export class CreateClientCommandHandler implements ICommandHandler<CreateClientCommand, string> {
    @Inject()
    private readonly _createAuthByEmailCommandHandler: CreateAuthByEmailCommandHandler;

    @Inject('client.repository')
    private readonly _clientRepository: IClientRepository;

    @Inject('auth.repository')
    private readonly _authRepository: IAuthRepository;

    async handle(param: CreateClientCommand): Promise<string> {
        if(param.roleAuthId !== RoleId.SUPER_ADMIN)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'permission')
        
        const client = new Client({ id: v4() } as IClient)
        client.roleId = RoleId.CLIENT;
        client.status = ClientStatus.ACTIVATED;
        client.firstName = param.firstName;
        client.lastName = param.lastName;
        client.email = param.email;
        client.gender = param.gender;
        client.birthday = param.birthday;
        client.phone = param.phone;
        client.address = param.address;
        client.culture = param.culture;
        client.currency = param.currency;

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
        
        // check role
        const id = await this._clientRepository.create(client);
        if(!id)
            throw new SystemError(MessageError.DATA_CANNOT_SAVE);
        await this._createAuthByEmailCommandHandler.handle(auth);
        return id;
    }
}