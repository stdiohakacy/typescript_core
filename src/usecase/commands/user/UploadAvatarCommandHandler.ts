import * as mime from 'mime-types';
import { Inject, Service } from "typedi";
import { IUserRepository } from '../../../base/repository/IUserRepository';
import { User } from "../../../domain/user/User";
import { MessageError } from "../../../exceptions/MessageError";
import { SystemError } from "../../../exceptions/SystemError";
import { removeFile } from '../../../libs/file';
import { IStorageService } from '../../../services/storage/IStoreService';
import { ICommandHandler } from './../../../base/usecase/ICommandHandler';
import { UploadAvatarCommand } from './UploadAvatarCommand';

@Service()
export class UploadAvatarCommandHandler implements ICommandHandler<UploadAvatarCommand, string> {
    @Inject('user.repository')
    private readonly _userRepository: IUserRepository;

    @Inject('storage.service')
    private readonly _storageService: IStorageService;

    async handle(param: UploadAvatarCommand): Promise<string> {
        if(!param.userAuthId)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'permission');
        if(!param.file)
            throw new SystemError(MessageError.PARAM_REQUIRED, 'avatar file');
        const ext = mime.extension(param.file.mimetype);
        if(!ext)
            throw new SystemError(MessageError.PARAM_INVALID, 'avatar file');
        User.validateAvatarFile(param.file);
        const avatarPath = User.getAvatarPath(param.userAuthId, ext);
        const data = new User();
        data.avatar = avatarPath;

        let hasSucceed = await this._storageService.upload(avatarPath, param.file.path, param.file.mimetype).finally(() => removeFile(param.file.path));

        if(!hasSucceed)
            throw new SystemError(MessageError.PARAM_CANNOT_UPLOAD, 'avatar file');
        
        hasSucceed = await this._userRepository.update(param.userAuthId, data);
        if(!hasSucceed)
            throw new SystemError(MessageError.DATA_CANNOT_SAVE);
        
        return avatarPath;
    }
}