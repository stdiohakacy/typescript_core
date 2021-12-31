import { Body, JsonController, Post } from 'routing-controllers';
import { CreateCategoryCommand } from '../usecase/commands/CreateCategoryCommand';
import { CreateCategoryCommandHandler } from '../usecase/commands/CreateCategoryCommandHandler';

@JsonController('/categories')
export class CategoryController {
  constructor(
    private readonly _createCategoryCommandHandler: CreateCategoryCommandHandler
  ) {}

  // @Inject('category.repository')
  // private readonly _categoryRepository: ICategoryRepository;

  @Post('/')
  async create(@Body() param: CreateCategoryCommand): Promise<string> {
    return await this._createCategoryCommandHandler.handle(param);
  }
}