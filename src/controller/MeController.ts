import { BodyParam, JsonController, Patch } from "routing-controllers";
import { Service } from "typedi";
import { UpdatePasswordByEmailCommand } from "../usecase/commands/auth/UpdatePasswordByEmailCommand";
import { UpdatePasswordByEmailCommandHandler } from "../usecase/commands/auth/UpdatePasswordByEmailCommandHandler";

@Service()
@JsonController("/me")
export class MeController {
    constructor(
        private readonly _updatePasswordByEmailCommandHandler: UpdatePasswordByEmailCommandHandler
    ) {}

    @Patch('/password')
    async updatePassword(
        @BodyParam('password') password: string,
        @BodyParam('newPassword') newPassword: string,
        // @CurrentUser() userAuth: UserAuthenticated
    ): Promise<boolean> {
        const param = new UpdatePasswordByEmailCommand();
        // param.userAuthId = userAuth.userId;
        param.userAuthId = '31872e3e-2ceb-4c43-8277-9a0e41f0f84d';
        param.oldPassword = password;
        param.password = newPassword;
        return await this._updatePasswordByEmailCommandHandler.handle(param);
    }
}