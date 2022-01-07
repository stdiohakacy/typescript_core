import { RoleId } from './../enums/RoleId';
import { DeleteManagerCommand } from './../usecase/commands/manager/DeleteManagerCommand';
import { Body, Delete, Get, JsonController, Param, Params, Post, Put } from "routing-controllers";
import { Service } from "typedi";
import { CreateManagerCommand } from "../usecase/commands/manager/CreateManagerCommand";
import { CreateManagerCommandHandler } from "../usecase/commands/manager/CreateManagerCommandHandler";
import { UpdateManagerCommand } from "../usecase/commands/manager/UpdateManagerCommand";
import { UpdateManagerCommandHandler } from "../usecase/commands/manager/UpdateManagerCommandHandler";
import { DeleteManagerCommandHandler } from '../usecase/commands/manager/DeleteManagerCommandHandler';
import { GetManagerByIdQueryHandler } from '../usecase/queries/manager/GetManagerByIdQueryHandler';
import { GetManagerByIdQuery } from '../usecase/queries/manager/GetManagerByIdQuery';

@Service()
@JsonController('/managers')
export class ManagerController {
    constructor(
        private readonly _createManagerCommandHandler: CreateManagerCommandHandler,
        private readonly _updateManagerCommandHandler: UpdateManagerCommandHandler,
        private readonly _deleteManagerCommandHandler: DeleteManagerCommandHandler,
        private readonly _getManagerByIdQueryHandler: GetManagerByIdQueryHandler,
    ) {}

    @Get('/:id([0-9a-f-]{36})')
    async getById(@Params() param: GetManagerByIdQuery) {
        param.roleAuthId = RoleId.SUPER_ADMIN;
        return await this._getManagerByIdQueryHandler.handle(param);
    }

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