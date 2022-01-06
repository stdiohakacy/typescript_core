import { Body, JsonController, Post } from "routing-controllers";
import { Service } from "typedi";
import { RoleId } from "../enums/RoleId";
import { CreateManagerCommand } from "../usecase/commands/manager/CreateManagerCommand";
import { CreateManagerCommandHandler } from "../usecase/commands/manager/CreateManagerCommandHandler";


@Service()
@JsonController('/managers')
export class ManagerController {
    constructor(
        private readonly _createManagerCommandHandler: CreateManagerCommandHandler
    ) {}

    @Post('/')
    async create(@Body() param: CreateManagerCommand) {
        param.roleAuthId = RoleId.SUPER_ADMIN;
        return await this._createManagerCommandHandler.handle(param);
    }
}