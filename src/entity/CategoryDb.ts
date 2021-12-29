import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseDbEntity } from '../base/entity/BaseDbEntity';
import { Category } from '../domain/Category';
import { ICategory } from '../domain/ICategory';

@Entity({name: "categories"})
export class CategoryDb extends BaseDbEntity<Category> implements ICategory {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column('varchar', { name: 'name', length: 50 })
    @Index({ unique: true })
    name: string;

    /* Relationship */

    /* Handlers */

    toEntity(): Category {
        return new Category(this);
    }

    fromEntity(entity: Category) {
        return entity.toData();
    }
}
