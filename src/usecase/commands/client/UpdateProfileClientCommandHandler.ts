import { MessageError } from './../../../exceptions/MessageError';
import { SystemError } from './../../../exceptions/SystemError';
import { IClientRepository } from './../../../base/repository/IClientRepository';
import { UpdateProfileClientCommand } from './UpdateProfileClientCommand';
import { ICommandHandler } from './../../../base/usecase/ICommandHandler';
import { Inject, Service } from "typedi";
import { Client } from '../../../domain/client/Client';

@Service()
export class UpdateProfileClientCommandHandler implements ICommandHandler<UpdateProfileClientCommand, boolean> {
    @Inject('client.repository')
    private readonly _clientRepository: IClientRepository

    async handle(param: UpdateProfileClientCommand): Promise<boolean> {
        if(!param.userAuthId)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'permission')
        const data = new Client();
        data.firstName = param.firstName;
        data.lastName = param.lastName;
        data.gender = param.gender;
        data.birthday = param.birthday;
        data.phone = param.phone;
        data.address = param.address;
        data.currency = param.currency;
        data.culture = param.culture;

        const hasSucceed = await this._clientRepository.update(param.userAuthId, data);
        if(!hasSucceed)
            throw new SystemError(MessageError.DATA_CANNOT_SAVE);
        return hasSucceed;
    }
}