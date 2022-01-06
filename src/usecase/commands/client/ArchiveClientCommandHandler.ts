import { ArchiveClientCommand } from './ArchiveClientCommand';
import { Inject, Service } from "typedi";
import { ICommandHandler } from "../../../base/usecase/ICommandHandler";
import { IClientRepository } from '../../../base/repository/IClientRepository';
import { RoleId } from '../../../enums/RoleId';
import { SystemError } from '../../../exceptions/SystemError';
import { MessageError } from '../../../exceptions/MessageError';
import { Client } from '../../../domain/client/Client';
import { ClientStatus } from '../../../enums/ClientStatus';

@Service()
export class ArchiveClientCommandHandler implements ICommandHandler<ArchiveClientCommand, boolean> {
    @Inject('client.repository')
    private readonly _clientRepository: IClientRepository;

    async handle(param: ArchiveClientCommand): Promise<boolean> {
        if(param.roleAuthId !== RoleId.SUPER_ADMIN)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'permission');
        if(!param.id)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'id');
        const client = await this._clientRepository.getById(param.id);
        if(!client)
            throw new SystemError(MessageError.DATA_NOT_FOUND);

        const data = new Client();
        data.status = ClientStatus.ARCHIVED;
        data.archivedAt = new Date();

        const hasSucceed = await this._clientRepository.update(param.id, data);
        if(!hasSucceed)
            throw new SystemError(MessageError.DATA_CANNOT_SAVE);
        return hasSucceed
    }
}