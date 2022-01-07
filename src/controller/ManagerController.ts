import { DeleteManagerCommand } from './../usecase/commands/manager/DeleteManagerCommand';
import { Body, Delete, JsonController, Param, Params, Post, Put } from "routing-controllers";
import { Service } from "typedi";
import { RoleId } from "../enums/RoleId";
import { CreateManagerCommand } from "../usecase/commands/manager/CreateManagerCommand";
import { CreateManagerCommandHandler } from "../usecase/commands/manager/CreateManagerCommandHandler";
import { UpdateManagerCommand } from "../usecase/commands/manager/UpdateManagerCommand";
import { UpdateManagerCommandHandler } from "../usecase/commands/manager/UpdateManagerCommandHandler";
import { DeleteManagerCommandHandler } from '../usecase/commands/manager/DeleteManagerCommandHandler';

@Service()
@JsonController('/managers')
export class ManagerController {
    constructor(
        private readonly _createManagerCommandHandler: CreateManagerCommandHandler,
        private readonly _updateManagerCommandHandler: UpdateManagerCommandHandler,
        private readonly _deleteManagerCommandHandler: DeleteManagerCommandHandler
    ) {}

    @Post('/')
    async create(@Body() param: CreateManagerCommand) {
        param.roleAuthId = RoleId.SUPER_ADMIN;
        return await this._createManagerCommandHandler.handle(param);
    }

    @Put('/:id([0-9a-f-]{36})')
    async update(@Param('id') id: string, @Body() param: UpdateManagerCommand): Promise<boolean> {
        param.id = id;
        return await this._updateManagerCommandHandler.handle(param);
    }

    @Delete('/:id([0-9a-f-]{36})')
    async delete(@Params() param: DeleteManagerCommand) {
        param.roleAuthId = RoleId.SUPER_ADMIN;
        return await this._deleteManagerCommandHandler.handle(param);
    }
}