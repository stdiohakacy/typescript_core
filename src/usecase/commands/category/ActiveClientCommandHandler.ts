import * as validator from 'class-validator';
import { Inject, Service } from "typedi";
import { IClientRepository } from '../../../base/repository/IClientRepository';
import { ICommandHandler } from "../../../base/usecase/ICommandHandler";
import { Client } from '../../../domain/client/Client';
import { ClientStatus } from '../../../enums/ClientStatus';
import { MessageError } from './../../../exceptions/MessageError';
import { SystemError } from './../../../exceptions/SystemError';
import { ActiveClientCommand } from "./ActiveClientCommand";

@Service()
export class ActiveClientCommandHandler implements ICommandHandler<ActiveClientCommand, boolean> {
    @Inject('client.repository')
    private readonly _clientRepository: IClientRepository;

    async handle(param: ActiveClientCommand): Promise<boolean> {
        if(!param.email)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'email')
        if(!validator.isEmail(param.email))
            throw new SystemError(MessageError.PARAM_INVALID, 'email')
        if(!param.activeKey)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'activation key')

        const client = await this._clientRepository.getByEmail(param.email);
        if(!client || client.activeKey !== param.activeKey || client.status === ClientStatus.ACTIVATED)
            throw new SystemError(MessageError.DATA_INVALID);
        if (!client.activeExpire || client.activeExpire < new Date())
            throw new SystemError(MessageError.PARAM_EXPIRED, 'activation key');

        const data = new Client();
        data.status = ClientStatus.ACTIVATED;
        data.activeKey = '';
        data.activatedAt = new Date();

        const hasSucceed = await this._clientRepository.update(client.id, data);
        if (!hasSucceed)
            throw new SystemError(MessageError.DATA_CANNOT_SAVE);

        return hasSucceed;
    }
}