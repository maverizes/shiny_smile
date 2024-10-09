import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { Category } from '../../category/model/category.model'; 

@Table
export class Product extends Model<Product> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    description: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    image: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    price: number;

    @ForeignKey(() => Category)
    @Column
    categoryId: number;
}
