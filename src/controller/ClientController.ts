import { Body, JsonController, Post } from "routing-controllers";
import { Service } from "typedi";
import { RegisterClientCommand } from "../usecase/commands/client/RegisterClientCommand";
import { RegisterClientCommandHandler } from "../usecase/commands/client/RegisterClientCommandHandler";

@Service()
@JsonController("/clients")
export class ClientController {
    constructor(
        private readonly _registerClientCommandHandler: RegisterClientCommandHandler
    ) {}

    @Post('/register')
    async register(@Body() param: RegisterClientCommand) {
        return await this._registerClientCommandHandler.handle(param);
    }
}