import { FindManagerQueryHandler } from './../usecase/queries/manager/FindManagerQueryHandler';
import { RoleId } from './../enums/RoleId';
import { DeleteManagerCommand } from './../usecase/commands/manager/DeleteManagerCommand';
import { Authorized, Body, CurrentUser, Delete, Get, JsonController, Param, Params, Post, Put, QueryParams } from "routing-controllers";
import { Service } from "typedi";
import { CreateManagerCommand } from "../usecase/commands/manager/CreateManagerCommand";
import { CreateManagerCommandHandler } from "../usecase/commands/manager/CreateManagerCommandHandler";
import { UpdateManagerCommand } from "../usecase/commands/manager/UpdateManagerCommand";
import { UpdateManagerCommandHandler } from "../usecase/commands/manager/UpdateManagerCommandHandler";
import { DeleteManagerCommandHandler } from '../usecase/commands/manager/DeleteManagerCommandHandler';
import { GetManagerByIdQueryHandler } from '../usecase/queries/manager/GetManagerByIdQueryHandler';
import { GetManagerByIdQuery } from '../usecase/queries/manager/GetManagerByIdQuery';
import { FindManagerQuery } from '../usecase/queries/manager/FindManagerQuery';
import { UserAuthenticated } from '../domain/UserAuthenticated';
import { ArchiveManagerCommandHandler } from '../usecase/commands/manager/ArchiveManagerCommandHandler';
import { ArchiveManagerCommand } from '../usecase/commands/manager/ArchiveManagerCommand';

@Service()
@JsonController('/managers')
export class ManagerController {
    constructor(
        private readonly _createManagerCommandHandler: CreateManagerCommandHandler,
        private readonly _updateManagerCommandHandler: UpdateManagerCommandHandler,
        private readonly _deleteManagerCommandHandler: DeleteManagerCommandHandler,
        private readonly _getManagerByIdQueryHandler: GetManagerByIdQueryHandler,
        private readonly _findManagerQueryHandler: FindManagerQueryHandler,
        private readonly _archiveManagerCommandHandler: ArchiveManagerCommandHandler,
    ) {}

    @Get('/')
    @Authorized([RoleId.SUPER_ADMIN])
    async find(@QueryParams() param: FindManagerQuery, @CurrentUser() userAuth: UserAuthenticated) {
        param.roleAuthId = userAuth.roleId;
        return await this._findManagerQueryHandler.handle(param);
    }

    @Get('/:id([0-9a-f-]{36})')
    @Authorized([RoleId.SUPER_ADMIN])
    async getById(@Params() param: GetManagerByIdQuery, @CurrentUser() userAuth: UserAuthenticated) {
        param.roleAuthId = userAuth.roleId;
        return await this._getManagerByIdQueryHandler.handle(param);
    }

    @Post('/')
    @Authorized([RoleId.SUPER_ADMIN])
    async create(@Body() param: CreateManagerCommand, @CurrentUser() userAuth: UserAuthenticated) {
        param.roleAuthId = userAuth.roleId;
        return await this._createManagerCommandHandler.handle(param);
    }

    @Put('/:id([0-9a-f-]{36})')
    @Authorized([RoleId.SUPER_ADMIN])
    async update(@Param('id') id: string, @Body() param: UpdateManagerCommand): Promise<boolean> {
        param.id = id;
        return await this._updateManagerCommandHandler.handle(param);
    }

    @Delete('/:id([0-9a-f-]{36})')
    @Authorized([RoleId.SUPER_ADMIN])
    async delete(@Params() param: DeleteManagerCommand, @CurrentUser() userAuth: UserAuthenticated) {
        param.roleAuthId = userAuth.roleId;
        return await this._deleteManagerCommandHandler.handle(param);
    }

    @Post('/:id([0-9a-f-]{36})/archive')
    @Authorized([RoleId.SUPER_ADMIN])
    async archive(@Params() param: ArchiveManagerCommand, @CurrentUser() userAuth: UserAuthenticated) {
        param.roleAuthId = userAuth.roleId;
        return await this._archiveManagerCommandHandler.handle(param);
    }
}