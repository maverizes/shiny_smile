import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { Customer } from '../../customers/model/customer.model';

@Table
export class Order extends Model<Order> {
    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    created_at: Date;

    @Column({
        type: DataType.ENUM,
        values: ['pending', 'completed', 'cancelled'],
        allowNull: false
    })
    status: string;

    @ForeignKey(() => Customer)
    @Column({
        type: DataType.BIGINT,
        allowNull: false
    })
    customer_id: number;
}
