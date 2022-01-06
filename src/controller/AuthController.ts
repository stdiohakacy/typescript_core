import { ForgotPasswordByEmailCommandHandler } from './../usecase/commands/auth/ForgotPasswordByEmailCommandHandler';
import { GetUserAuthByJwtQueryHandler } from './../usecase/commands/auth/GetUserAuthByJwtQueryHandler';
import { LoginByEmailQueryHandler } from './../usecase/queries/auth/LoginByEmailQueryHandler';
import { Service } from "typedi";
import { BodyParam, HeaderParam, JsonController, Post } from 'routing-controllers';
import { UserAuthenticated } from '../domain/UserAuthenticated';
import { LoginByEmailQuery } from '../usecase/queries/auth/LoginByEmailQuery';
import { GetUserAuthByJwtQuery } from '../usecase/commands/auth/GetUserAuthByJwtQuery';
import { ForgotPasswordByEmailCommand } from '../usecase/commands/auth/ForgotPasswordByEmailCommand';

@Service()
@JsonController('/auth')
export class AuthController {
    constructor(
        private readonly _loginByEmailQueryHandler: LoginByEmailQueryHandler,
        private readonly _getUserAuthByJwtQueryHandler: GetUserAuthByJwtQueryHandler,
        private readonly _forgotPasswordByEmailCommandHandler: ForgotPasswordByEmailCommandHandler
    ) {}

    @Post('/login')
    async login(@BodyParam('email') email: string, @BodyParam('password') password: string): Promise<UserAuthenticated> {
        const param = new LoginByEmailQuery();
        param.email = email;
        param.password = password;

        return await this._loginByEmailQueryHandler.handle(param);
    }

    @Post('/')
    async authenticate(@HeaderParam('authorization') authorization: string, @BodyParam('token') token: string): Promise<UserAuthenticated> {
        const param = new GetUserAuthByJwtQuery();
        if (authorization) {
            const parts = (authorization || '').split(' ');
            param.token = parts.length === 2 && parts[0] === 'Bearer' ? parts[1] : '';
        }
        else if (token)
            param.token = token;
        return await this._getUserAuthByJwtQueryHandler.handle(param)
    }

    @Post('/forgot-password')
    async forgotPassword(@BodyParam('email') email: string): Promise<boolean> {
        const param = new ForgotPasswordByEmailCommand();
        param.email = email;
        return await this._forgotPasswordByEmailCommandHandler.handle(param);
    }
}