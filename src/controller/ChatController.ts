import { Authorized, BodyParam, CurrentUser, JsonController, Post } from "routing-controllers";
import { Service } from "typedi";
import { UserAuthenticated } from "../domain/UserAuthenticated";
import { CreateChannelCommand } from "../usecase/commands/chat/CreateChannelCommand";
import { CreateChannelCommandHandler } from "../usecase/commands/chat/CreateChannelCommandHandler";

@Service()
@JsonController("/chats")
export class ChatController {
    constructor(
        private readonly _createChannelCommandHandler: CreateChannelCommandHandler,
    ){}

    @Post('/channel')
    @Authorized()
    async create(@BodyParam('toUserId') toUserId: string, @CurrentUser() userAuth: UserAuthenticated): Promise<string> {
        const param = new CreateChannelCommand();
        param.name = [toUserId, userAuth.userId].sort().join();
        return await this._createChannelCommandHandler.handle(param);
    }
}