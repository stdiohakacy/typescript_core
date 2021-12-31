import { Service } from "typedi";
import { BaseRepository } from "../../base/repository/BaseRepository";
import { Category } from "../../domain/category/Category";
import { CategoryDb } from "../../entity/CategoryDb";
import { CATEGORY_SCHEMA } from "../../schema/CategorySchema";
import { ICategoryRepository } from "../../base/repository/ICategoryRepository";

@Service("category.repository")
export class CategoryRepository extends BaseRepository<Category, CategoryDb, string> implements ICategoryRepository {
    constructor() {
        super(CategoryDb, CATEGORY_SCHEMA)
    }
}