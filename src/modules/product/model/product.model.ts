// product.model.ts
import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { Category } from '../../category/model/category.model';

@Table
export class Product extends Model<Product> {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description: string;

    @Column({
        type: DataType.BIGINT,
        allowNull: false
    })
    price: number;

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    image: string;

    @ForeignKey(() => Category)
    @Column({
        type: DataType.BIGINT,
        allowNull: false
    })
    category_id: number;
}
