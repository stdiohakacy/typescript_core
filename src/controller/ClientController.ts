import { Body, JsonController, Post } from "routing-controllers";
import { Service } from "typedi";
import { ActiveClientCommandHandler } from '../usecase/commands/category/ActiveClientCommandHandler';
import { RegisterClientCommand } from "../usecase/commands/client/RegisterClientCommand";
import { RegisterClientCommandHandler } from "../usecase/commands/client/RegisterClientCommandHandler";
import { ResendActivationCommand } from "../usecase/commands/client/ResendActivationCommand";
import { ResendActivationCommandHandler } from "../usecase/commands/client/ResendActivationCommandHandler";
import { ActiveClientCommand } from './../usecase/commands/category/ActiveClientCommand';

@Service()
@JsonController("/clients")
export class ClientController {
    constructor(
        private readonly _registerClientCommandHandler: RegisterClientCommandHandler,
        private readonly _activeClientCommandHandler: ActiveClientCommandHandler,
        private readonly _resendActivationCommandHandler: ResendActivationCommandHandler,
    ) {}

    @Post('/register')
    async register(@Body() param: RegisterClientCommand) {
        return await this._registerClientCommandHandler.handle(param);
    }

    @Post('/active')
    async active(@Body() param: ActiveClientCommand) {
        return await this._activeClientCommandHandler.handle(param);
    }

    @Post('/resend-activation')
    async resendActivation(@Body() param: ResendActivationCommand) {
        return this._resendActivationCommandHandler.handle(param);
    }
}