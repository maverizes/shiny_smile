import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from '@modules';

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

    @ForeignKey(() => User)
    @Column({
        type: DataType.BIGINT,
        allowNull: false
    })
    customer_id: number;
}
