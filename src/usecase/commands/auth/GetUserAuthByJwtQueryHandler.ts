import * as validator from 'class-validator';
import { Inject, Service } from 'typedi';
import { IQueryHandler } from './../../../base/usecase/IQueryHandler';
import { UserAuthenticated } from './../../../domain/UserAuthenticated';
import { AccessDeniedError } from './../../../exceptions/AccessDeniedError';
import { MessageError } from './../../../exceptions/MessageError';
import { UnauthorizedError } from './../../../exceptions/UnauthorizedError';
import { IAuthJwtService } from './../../../services/auth/IAuthJwtService';
import { GetUserAuthByJwtQuery } from './GetUserAuthByJwtQuery';

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