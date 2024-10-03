import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class Customer extends Model<Customer> {

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    phone: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    image: string;
}
