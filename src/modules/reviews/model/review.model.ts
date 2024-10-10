import { Column, Model, Table, PrimaryKey, AutoIncrement, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from '@modules';

@Table({ tableName: 'reviews', timestamps: false })
export class Review extends Model<Review> {
  
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
  })
  customer_id: number;
}
