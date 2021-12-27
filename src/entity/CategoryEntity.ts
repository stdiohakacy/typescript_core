import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { ProductEntity } from "./ProductEntity";

@Entity({ name: "category" })
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => ProductEntity, products => products.category)
    products: ProductEntity[];
}
