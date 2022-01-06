import { DeleteClientCommandHandler } from './../usecase/commands/client/DeleteClientCommandHandler';
import { Body, Delete, JsonController, Param, Params, Post, Put } from "routing-controllers";
import { Service } from "typedi";
import { RoleId } from "../enums/RoleId";
import { ActiveClientCommandHandler } from '../usecase/commands/category/ActiveClientCommandHandler';
import { CreateClientCommand } from "../usecase/commands/client/CreateClientCommand";
import { CreateClientCommandHandler } from "../usecase/commands/client/CreateClientCommandHandler";
import { DeleteClientCommand } from "../usecase/commands/client/DeleteClientCommand";
import { RegisterClientCommand } from "../usecase/commands/client/RegisterClientCommand";
import { RegisterClientCommandHandler } from "../usecase/commands/client/RegisterClientCommandHandler";
import { ResendActivationCommand } from "../usecase/commands/client/ResendActivationCommand";
import { ResendActivationCommandHandler } from "../usecase/commands/client/ResendActivationCommandHandler";
import { UpdateClientCommand } from "../usecase/commands/client/UpdateClientCommand";
import { UpdateClientCommandHandler } from "../usecase/commands/client/UpdateClientCommandHandler";
import { ActiveClientCommand } from './../usecase/commands/category/ActiveClientCommand';

@Service()
@JsonController("/clients")
export class ClientController {
    constructor(
        private readonly _registerClientCommandHandler: RegisterClientCommandHandler,
        private readonly _activeClientCommandHandler: ActiveClientCommandHandler,
        private readonly _resendActivationCommandHandler: ResendActivationCommandHandler,
        private readonly _createClientCommandHandler: CreateClientCommandHandler,
        private readonly _updateClientCommandHandler: UpdateClientCommandHandler,
        private readonly _deleteClientCommandHandler: DeleteClientCommandHandler,
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

    @Post('/')
    async create(@Body() param: CreateClientCommand) {
        param.roleAuthId = RoleId.CLIENT;
        return await this._createClientCommandHandler.handle(param);
    }

    @Put('/:id([0-9a-f-]{36})')
    async update(@Param('id') id: string, @Body() param: UpdateClientCommand): Promise<boolean> {
        param.id = id;
        return await this._updateClientCommandHandler.handle(param);
    }

    @Delete('/:id([0-9a-f-]{36})')
    async delete(@Params() param: DeleteClientCommand) {
        param.roleAuthId = RoleId.SUPER_ADMIN;
        return await this._deleteClientCommandHandler.handle(param);
    }
}