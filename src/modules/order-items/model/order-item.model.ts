// order-item.model.ts
import { Column, Model, Table, ForeignKey, DataType } from 'sequelize-typescript';
import { Order } from '../../order/model/order.model';
import { Product } from '../../product/model/product.model';

@Table({ tableName: 'order_items', timestamps: false })
export class OrderItem extends Model<OrderItem> {

  @ForeignKey(() => Product)
  @Column({
    type: DataType.BIGINT,
  })
  product_id: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.BIGINT,
  })
  order_id: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  total_price: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  quantity: number;
}
