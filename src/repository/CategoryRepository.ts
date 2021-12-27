import {EntityRepository, AbstractRepository} from "typeorm";
import { CategoryEntity } from "../entity/CategoryEntity";

@EntityRepository(CategoryEntity)
export class CategoryRepository extends AbstractRepository<CategoryEntity> {
    createAndSave(name: string) {
        const category = new CategoryEntity();
        category.name = name;
        return this.manager.save(category);
    }
}