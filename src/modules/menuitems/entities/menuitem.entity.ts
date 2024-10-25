import { Menugroup } from "src/modules/menugroup/entities/menugroup.entity";
import { Order } from "src/modules/order/entities/order.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:"menuitems"})
export class Menuitem {

    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column({type:"varchar", length:225,name:"menu_item_name",nullable:false})
    name:string

    @Column({type:"varchar", length:225,name:"description",nullable:true})
    description:string


    @Column({type:"int",name:"price",nullable:false})
    price:number

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

    @ManyToOne(()=>Menugroup,(menugroup)=>menugroup.menuItems)
    menugroup:Menugroup

    @ManyToMany(()=>Order,(order)=>order.menuItems,{onDelete: 'CASCADE'})
    orders:Order[];
}
