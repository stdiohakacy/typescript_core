import { Body, JsonController, Post } from 'routing-controllers';
import { Inject } from 'typedi';
import { Category } from '../domain/Category';
import { ICategoryRepository } from '../base/repository/ICategoryRepository';

@JsonController('/v1/categories')
export class CategoryController {
  @Inject('category.repository')
  private readonly _categoryRepository: ICategoryRepository;

  @Post('/')
  async create(@Body() category: any) {
    const data = new Category();
    data.name = category.name;
    return this._categoryRepository.create(data);
  }
}