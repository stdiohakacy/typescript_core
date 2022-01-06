import { MessageError } from './../../../exceptions/MessageError';
import { SystemError } from './../../../exceptions/SystemError';
import { RoleId } from './../../../enums/RoleId';
import { UpdateClientCommand } from './UpdateClientCommand';
import { ICommandHandler } from "../../../base/usecase/ICommandHandler";
import { Inject } from 'typedi';
import { IClientRepository } from '../../../base/repository/IClientRepository';
import { Client } from '../../../domain/client/Client';

export class UpdateClientCommandHandler implements ICommandHandler<UpdateClientCommand, boolean> {
    @Inject('client.repository')
    private readonly _clientRepository: IClientRepository;
    
    async handle(param: UpdateClientCommand): Promise<boolean> {
        if(param.roleAuthId !== RoleId.SUPER_ADMIN)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'permission');
        if(!param.id)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'id');
        
        const id = param.id
        const data = new Client();
        data.firstName = param.firstName;
        data.lastName = param.lastName;
        data.gender = param.gender;
        data.birthday = param.birthday;
        data.phone = param.phone;
        data.address = param.address;
        data.currency = param.currency;
        data.culture = param.culture;

        const client = await this._clientRepository.getById(id);
        if(!client)
            throw new SystemError(MessageError.DATA_NOT_FOUND);
        const hasSucceed = await this._clientRepository.update(id, data);
        if(!hasSucceed)
            throw new SystemError(MessageError.DATA_CANNOT_SAVE);
        
        return hasSucceed;
    }
}