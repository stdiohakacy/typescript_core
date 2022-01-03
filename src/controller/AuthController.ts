import { LoginByEmailQueryHandler } from './../usecase/queries/auth/LoginByEmailQueryHandler';
import { Service } from "typedi";
import { BodyParam, JsonController, Post } from 'routing-controllers';
import { UserAuthenticated } from '../domain/UserAuthenticated';
import { LoginByEmailQuery } from '../usecase/queries/auth/LoginByEmailQuery';

@Service()
@JsonController('/auth')
export class AuthController {
    constructor(
        private readonly _loginByEmailQueryHandler: LoginByEmailQueryHandler
    ) {}

    @Post('/login')
    async login(@BodyParam('email') email: string, @BodyParam('password') password: string): Promise<UserAuthenticated> {
        const param = new LoginByEmailQuery();
        param.email = email;
        param.password = password;

        return await this._loginByEmailQueryHandler.handle(param);
    }
}