import { Inject, Service } from "typedi";
import { ICategoryRepository } from "../../base/repository/ICategoryRepository";
import { ICommandHandler } from "../../base/usecase/ICommandHandler";
import { Category } from "../../domain/Category";
import { MessageError } from '../../exceptions/MessageError';
import { SystemError } from './../../exceptions/SystemError';
import { CreateCategoryCommand } from "./CreateCategoryCommand";

@Service()
export class CreateCategoryCommandHandler implements ICommandHandler<CreateCategoryCommand, string> {
    @Inject('category.repository')
    private readonly _categoryRepository: ICategoryRepository;

    async handle(param: CreateCategoryCommand): Promise<string> {
        const category = new Category();
        category.name = param.name;
        const id = await this._categoryRepository.create(category);
        if(!id)
            throw new SystemError(MessageError.DATA_CANNOT_SAVE, 'name');
        return id;
    }
}