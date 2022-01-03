import { Inject, Service } from "typedi";
import { IAuthRepository } from '../../../base/repository/IAuthRepository';
import { IClientRepository } from '../../../base/repository/IClientRepository';
import { IManagerRepository } from "../../../base/repository/IManagerRepository";
import { ICommandHandler } from "../../../base/usecase/ICommandHandler";
import { UserAuthenticated } from "../../../domain/UserAuthenticated";
import { ClientStatus } from '../../../enums/ClientStatus';
import { ManagerStatus } from "../../../enums/ManagerStatus";
import { RoleId } from '../../../enums/RoleId';
import { IAuthJwtService } from '../../../services/auth/IAuthJwtService';
import { MessageError } from './../../../exceptions/MessageError';
import { SystemError } from './../../../exceptions/SystemError';
import { LoginByEmailQuery } from "./LoginByEmailQuery";

@Service()
export class LoginByEmailQueryHandler implements ICommandHandler<LoginByEmailQuery, UserAuthenticated> {
    @Inject('auth.repository')
    private readonly _authRepository: IAuthRepository;

    @Inject('client.repository')
    private readonly _clientRepository: IClientRepository;

    @Inject('manager.repository')
    private readonly _managerRepository: IManagerRepository;

    @Inject('auth_jwt.service')
    private readonly _jwtService: IAuthJwtService;

    async handle(param: LoginByEmailQuery): Promise<UserAuthenticated> {
        if(!param.email)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'email')
        if(!param.password)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'password');

        const auth = await this._authRepository.getByUsername(param.email);
        if(!auth || !auth.comparePassword(param.password) || !auth.user)
            throw new SystemError(MessageError.PARAM_INCORRECT, 'email or password')

        if(auth.user.roleId === RoleId.CLIENT) {
            const client = await this._clientRepository.getById(auth.userId);
            if(!client)
                throw new SystemError(MessageError.PARAM_NOT_EXISTS, 'account');
            if(client.status !== ClientStatus.ACTIVATED)
                throw new SystemError(MessageError.PARAM_NOT_ACTIVATED, 'account');
        } else {
            const manager = await this._managerRepository.getById(auth.userId);
            if(!manager)
                throw new SystemError(MessageError.PARAM_NOT_EXISTS, 'account');
            if(manager.status !== ManagerStatus.ACTIVATED)
                throw new SystemError(MessageError.PARAM_NOT_ACTIVATED, 'account');
        }

        const token = await this._jwtService.sign(auth.userId, auth.user.roleId);

        return new UserAuthenticated(token, auth.userId, auth.user.roleId);
    }
}