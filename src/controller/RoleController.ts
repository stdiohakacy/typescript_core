import { Body, Delete, Get, JsonController, Param, Params, Post, Put } from "routing-controllers";
import { Service } from "typedi";
import { CreateRoleCommand } from "../usecase/commands/role/CreateRoleCommand";
import { CreateRoleCommandHandler } from "../usecase/commands/role/CreateRoleCommandHandler";
import { DeleteRoleCommand } from "../usecase/commands/role/DeleteRoleCommand";
import { UpdateRoleCommand } from "../usecase/commands/role/UpdateRoleCommand";
import { UpdateRoleCommandHandler } from "../usecase/commands/role/UpdateRoleCommandHandler";
import { GetRoleByIdQueryHandler } from '../usecase/queries/role/GetRoleByIdQueryHandler';
import { GetRoleByIdQueryResult } from '../usecase/queries/role/GetRoleByIdQueryResult';
import { DeleteRoleCommandHandler } from './../usecase/commands/role/DeleteRoleCommandHandler';
import { GetRoleByIdQuery } from './../usecase/queries/role/GetRoleByIdQuery';

@Service()
@JsonController("/roles")
export class RoleController {
    constructor(
        private readonly _createRoleCommandHandler: CreateRoleCommandHandler,
        private readonly _deleteRoleCommandHandler: DeleteRoleCommandHandler,
        private readonly _updateRoleCommandHandler: UpdateRoleCommandHandler,
        private readonly _getRoleByIdQueryHandler: GetRoleByIdQueryHandler,
    ){}

    @Post('/')
    async create(@Body() param: CreateRoleCommand): Promise<string> {
        return await this._createRoleCommandHandler.handle(param);
    }
    
    @Delete('/:id([0-9a-f-]{36})')
    async delete(@Params() param: DeleteRoleCommand): Promise<boolean> {
        return await this._deleteRoleCommandHandler.handle(param);
    }

    @Put('/:id([0-9a-f-]{36})')
    async update(@Param('id') id: string, @Body() param: UpdateRoleCommand): Promise<boolean> {
        param.id = id;
        return await this._updateRoleCommandHandler.handle(param);
    }

    @Get("/:id([0-9a-f-]{36})")
    async getById(@Params() param: GetRoleByIdQuery): Promise<GetRoleByIdQueryResult> {
        return await this._getRoleByIdQueryHandler.handle(param);
    }
}