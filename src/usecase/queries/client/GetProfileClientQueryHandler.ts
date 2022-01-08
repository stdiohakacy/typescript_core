import { IQueryHandler } from './../../../base/usecase/IQueryHandler';
import { Inject, Service } from "typedi";
import { GetProfileClientQuery } from './GetProfileClientQuery';
import { GetProfileClientQueryResult } from './GetMyProfileClientQueryResult';
import { IClientRepository } from '../../../base/repository/IClientRepository';
import { SystemError } from '../../../exceptions/SystemError';
import { MessageError } from '../../../exceptions/MessageError';

@Service()
export class GetProfileClientQueryHandler implements IQueryHandler<GetProfileClientQuery, GetProfileClientQueryResult> {
    @Inject('client.repository')
    private readonly _clientRepository: IClientRepository;

    async handle(param: GetProfileClientQuery): Promise<GetProfileClientQueryResult> {
        if(!param.userAuthId)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'permission');
        const client = await this._clientRepository.getById(param.userAuthId);
        if(!client)
            throw new SystemError(MessageError.DATA_NOT_FOUND);
        return new GetProfileClientQueryResult(client);
    }
}