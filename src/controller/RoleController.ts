import { Body, Delete, Get, JsonController, Params, Post } from "routing-controllers";
import { Service } from "typedi";
import { CreateRoleCommand } from "../usecase/commands/role/CreateRoleCommand";
import { CreateRoleCommandHandler } from "../usecase/commands/role/CreateRoleCommandHandler";
import { DeleteRoleCommand } from "../usecase/commands/role/DeleteRoleCommand";
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

    @Get("/:id([0-9a-f-]{36})")
    async getById(@Params() param: GetRoleByIdQuery): Promise<GetRoleByIdQueryResult> {
        return await this._getRoleByIdQueryHandler.handle(param);
    }
}