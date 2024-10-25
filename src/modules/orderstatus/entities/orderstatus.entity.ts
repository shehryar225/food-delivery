import { orderStatuses } from "src/enums/orderStatuses.enum";
import { Order } from "src/modules/order/entities/order.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:"orderStatus"})
export class Orderstatus {

    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column({ type:'enum',enum:orderStatuses,name:"status", default:orderStatuses.ORDERED })
    status: orderStatuses;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'created_at',
        default: () => 'CURRENT_TIMESTAMP(6)',
      })
      createdAt: Date;
    
    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_at',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
      })
      updatedAt: Date;

      // @ManyToOne(()=>Order,(order)=>order.orderstatus,{ onDelete: 'CASCADE' })
      // order:Order
}
