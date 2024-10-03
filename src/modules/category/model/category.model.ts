import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Product } from '../../product/model/product.model';

@Table
export class Category extends Model<Category> {

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;

    @HasMany(() => Product)
    products: Product[];
}