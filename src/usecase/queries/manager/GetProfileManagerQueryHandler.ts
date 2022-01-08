import { MessageError } from './../../../exceptions/MessageError';
import { SystemError } from './../../../exceptions/SystemError';
import { GetProfileManagerQuery } from './GetProfileManagerQuery';
import { IQueryHandler } from './../../../base/usecase/IQueryHandler';
import { Inject, Service } from "typedi";
import { GetProfileManagerQueryResult } from './GetProfileManagerQueryResult';
import { IManagerRepository } from '../../../base/repository/IManagerRepository';

@Service()
export class GetProfileManagerQueryHandler implements IQueryHandler<GetProfileManagerQuery, GetProfileManagerQueryResult>{
    @Inject('manager.repository')
    private readonly _managerRepository: IManagerRepository;

    async handle(param: GetProfileManagerQuery): Promise<GetProfileManagerQueryResult> {
        if(!param.userAuthId)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'permission');
        const manager = await this._managerRepository.getById(param.userAuthId);
        if(!manager)
            throw new SystemError(MessageError.DATA_NOT_FOUND);
        return new GetProfileManagerQueryResult(manager);
    }
}