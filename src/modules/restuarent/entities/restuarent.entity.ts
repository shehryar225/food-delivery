import { restuarentStatus } from "src/enums/restuarentStatus.enum";
import { Menu } from "src/modules/menu/entities/menu.entity";
import { Order } from "src/modules/order/entities/order.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:"restuarant"})
export class Restuarent {

    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column({type:"varchar", length:225,name:"restuarent_name",unique:true,nullable:false})
    name:string

    @Column({type:"varchar", length:225,name:"description",nullable:true})
    description:string

    @Column({type:"varchar", length:225,name:"restuarent_location",nullable:false})
    location: string

    @Column({type:'enum',enum:restuarentStatus, name:"is_active",default:restuarentStatus.ACTIVE})
    isActive:restuarentStatus

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

      @OneToOne(() => Menu, (menu) => menu.restuarant, { eager:true ,cascade: true})
      @JoinColumn()
      menu:Menu

      @OneToMany(()=> Order,(order)=>order.restaurant,{cascade:true})
      order:Order[]

}
