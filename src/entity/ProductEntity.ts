import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from './CategoryEntity';

@Entity({ name: "product" })
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => CategoryEntity, category => category.products)
    category: CategoryEntity;
}
