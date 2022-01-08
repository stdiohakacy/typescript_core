import multer from 'multer';
import path from 'path';
import { Body, BodyParam, CurrentUser, Get, JsonController, Patch, Post, Put, UploadedFile } from "routing-controllers";
import { Service } from "typedi";
import { UserAuthenticated } from "../domain/UserAuthenticated";
import { GenderType } from "../enums/GenderType";
import { RoleId } from "../enums/RoleId";
import { MessageError } from "../exceptions/MessageError";
import { SystemError } from "../exceptions/SystemError";
import { UpdatePasswordByEmailCommand } from "../usecase/commands/auth/UpdatePasswordByEmailCommand";
import { UpdatePasswordByEmailCommandHandler } from "../usecase/commands/auth/UpdatePasswordByEmailCommandHandler";
import { UpdateProfileClientCommandHandler } from "../usecase/commands/client/UpdateProfileClientCommandHandler";
import { UpdateProfileManagerCommand } from "../usecase/commands/manager/UpdateProfileManagerCommand";
import { UpdateProfileManagerCommandHandler } from "../usecase/commands/manager/UpdateProfileManagerCommandHandler";
import { UploadAvatarCommandHandler } from '../usecase/commands/user/UploadAvatarCommandHandler';
import { GetProfileClientQuery } from '../usecase/queries/client/GetProfileClientQuery';
import { GetProfileClientQueryHandler } from '../usecase/queries/client/GetProfileClientQueryHandler';
import { GetProfileManagerQueryHandler } from '../usecase/queries/manager/GetProfileManagerQueryHandler';
import { UpdateProfileClientCommand } from './../usecase/commands/client/UpdateProfileClientCommand';
import { UploadAvatarCommand } from "./../usecase/commands/user/UploadAvatarCommand";
import { GetProfileManagerQuery } from './../usecase/queries/manager/GetProfileManagerQuery';

const storage = multer.diskStorage({
    destination(_req, _file, cb) {
        console.log(`${path.join(__dirname, `../tmp/uploads`)}`)
        cb(null, `${path.join(__dirname, `../tmp/uploads`)}`);
    },
    filename(_req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}`);
    }
});

@Service()
@JsonController("/me")
export class MeController {
    constructor(
        private readonly _updatePasswordByEmailCommandHandler: UpdatePasswordByEmailCommandHandler,
        private readonly _updateProfileManagerCommandHandler: UpdateProfileManagerCommandHandler,
        private readonly _updateProfileClientCommandHandler: UpdateProfileClientCommandHandler,
        private readonly _uploadAvatarCommandHandler: UploadAvatarCommandHandler,
        private readonly _getProfileClientQueryHandler: GetProfileClientQueryHandler,
        private readonly _getProfileManagerQueryHandler: GetProfileManagerQueryHandler,
    ) {}

    @Get('/')
    async getProfile(@CurrentUser() userAuth: UserAuthenticated) {
        switch(userAuth.roleId){
            case RoleId.SUPER_ADMIN:
            case RoleId.MANAGER:
                return await this._getProfileManagerQueryHandler.handle(new GetProfileManagerQuery(userAuth.userId));
            case RoleId.CLIENT:
                return await this._getProfileClientQueryHandler.handle(new GetProfileClientQuery(userAuth.userId));
            default:
                throw new SystemError(MessageError.DATA_INVALID);
        }
    }

    @Patch('/password')
    async updatePassword(
        @BodyParam('password') password: string,
        @BodyParam('newPassword') newPassword: string,
        // @CurrentUser() userAuth: UserAuthenticated
    ): Promise<boolean> {
        const param = new UpdatePasswordByEmailCommand();
        // param.userAuthId = userAuth.userId;
        param.userAuthId = '31872e3e-2ceb-4c43-8277-9a0e41f0f84d';
        param.oldPassword = password;
        param.password = newPassword;
        return await this._updatePasswordByEmailCommandHandler.handle(param);
    }

    @Put('/')
    async updateMyProfile(@Body() body: {
        firstName: string,
        lastName: string | null,
        gender: GenderType | null,
        birthday: string | null,
        phone: string | null,
        address: string | null,
        culture: string | null,
        currency: string | null
    }, @CurrentUser() userAuth: UserAuthenticated): Promise<boolean> {
        switch (userAuth.roleId) {
        case RoleId.SUPER_ADMIN:
        case RoleId.MANAGER: {
            const param = new UpdateProfileManagerCommand();
            param.userAuthId = userAuth.userId;
            param.firstName = body.firstName;
            param.lastName = body.lastName;

            return await this._updateProfileManagerCommandHandler.handle(param);
        }
        case RoleId.CLIENT: {
            const param = new UpdateProfileClientCommand();
            param.userAuthId = userAuth.userId;
            param.firstName = body.firstName;
            param.lastName = body.lastName;
            param.gender = body.gender;
            param.birthday = body.birthday;
            param.phone = body.phone;
            param.address = body.address;
            param.culture = body.culture;
            param.currency = body.currency;

            return await this._updateProfileClientCommandHandler.handle(param);
        }
        default:
            throw new SystemError(MessageError.DATA_INVALID);
        }
    }

    @Post('/avatar')
    async uploadAvatar(
        @UploadedFile('avatar', { required: true, options: { storage } }) file: Express.Multer.File,
        // @CurrentUser() _userAuth: UserAuthenticated
    ) {
        const param = new UploadAvatarCommand();
        param.userAuthId = 'fe966d9e-6a6f-4fea-a6cc-1c0c1063166a';
        param.file = file;
        return await this._uploadAvatarCommandHandler.handle(param);
    }
}