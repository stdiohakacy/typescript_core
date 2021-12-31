import { Body, JsonController, Post } from 'routing-controllers';
import { CreateCategoryCommand } from '../usecase/commands/CreateCategoryCommand';
import { CreateCategoryCommandHandler } from '../usecase/commands/CreateCategoryCommandHandler';

@JsonController('/categories')
export class CategoryController {
  constructor(
    private readonly _createCategoryCommandHandler: CreateCategoryCommandHandler
  ) {}

  @Post('/')
  async create(@Body() param: CreateCategoryCommand): Promise<string> {
    return await this._createCategoryCommandHandler.handle(param);
  }
}