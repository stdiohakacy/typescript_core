import { AccessDeniedError } from './../../../exceptions/AccessDeniedError';
import { IAuthJwtService } from './../../../services/auth/IAuthJwtService';
import { MessageError } from './../../../exceptions/MessageError';
import { UnauthorizedError } from './../../../exceptions/UnauthorizedError';
import { UserAuthenticated } from './../../../domain/UserAuthenticated';
import { GetUserAuthByJwtQuery } from './GetUserAuthByJwtQuery';
import { IQueryHandler } from './../../../base/usecase/IQueryHandler';
import { Inject, Service } from 'typedi';
import * as validator from 'class-validator';

@Service()
export class GetUserAuthByJwtQueryHandler implements IQueryHandler<GetUserAuthByJwtQuery, UserAuthenticated> {
    @Inject('auth_jwt.service')
    private readonly _authJwtService: IAuthJwtService;

    async handle(param: GetUserAuthByJwtQuery): Promise<UserAuthenticated> {
        if(!param.token)
            throw new UnauthorizedError(MessageError.PARAM_REQUIRED, 'token');
        if(!validator.isJWT(param.token))
            throw new UnauthorizedError(MessageError.DATA_INVALID, 'token');

        let payload;
        try {
            payload = this._authJwtService.verify(param.token); 
        } catch (error) {
            if (error.name === 'TokenExpiredError')
                throw new UnauthorizedError(MessageError.PARAM_EXPIRED, 'token');
            else
                throw new UnauthorizedError(MessageError.PARAM_INVALID, 'token');
        }

        if (!payload || !payload.sub || !payload.roleId)
            throw new UnauthorizedError(MessageError.PARAM_INVALID, 'token payload');
        if (param.roleIds && param.roleIds.length && !param.roleIds.find(roleId => roleId === payload.roleId))
            throw new AccessDeniedError();

        return new UserAuthenticated(param.token, payload.sub, payload.roleId);
    }
}