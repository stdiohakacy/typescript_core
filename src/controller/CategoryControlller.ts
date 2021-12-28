import { Body, JsonController, Post } from 'routing-controllers';
import { getRepository } from 'typeorm';
import { CategoryDb } from '../entity/CategoryDb';

@JsonController('/v1/categories')
export class CategoryController {
  @Post('/')
  async create(@Body() category: any) {
    const categoryRepository = getRepository(CategoryDb)
    const cate = new CategoryDb();
    cate.name = category.name;
    return categoryRepository.save(cate);
  }
}