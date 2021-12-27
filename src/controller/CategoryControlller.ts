import { Body, JsonController, Post } from 'routing-controllers';
import { getRepository } from 'typeorm';
import { CategoryEntity } from './../entity/CategoryEntity';

@JsonController()
export class CategoryController {
  @Post('/categories')
  async create(@Body() category: any) {
    const categoryRepository = getRepository(CategoryEntity)
    const cate = new CategoryEntity();
    cate.name = category.name;
    return categoryRepository.save(cate);
  }
}