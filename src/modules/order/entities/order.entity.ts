import { orderPaid } from "src/enums/orderPaid.enum";
import { Customer } from "src/modules/customer/entities/customer.entity";
import { Menuitem } from "src/modules/menuitems/entities/menuitem.entity";
import { Orderstatus } from "src/modules/orderstatus/entities/orderstatus.entity";
import { Restuarent } from "src/modules/restuarent/entities/restuarent.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:"order"})
export class Order {

    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column({type:"varchar", length:225,name:"address",nullable:false})
    address:string

    @Column({ type: "int", name: "price", nullable: false })
    price: number;

    @Column({ type: 'enum', enum: orderPaid, name: "is_active", default: orderPaid.notPaid })
    isActive: orderPaid;
  
    @Column({ type: 'timestamp', name: 'taken_over_datetime', nullable: true })
  takenOverDateTime: Date;


    @Column({ type: 'timestamp', name: 'prepared_datetime', nullable: true })
  preparedDateTime: Date;

  @Column({ type: 'timestamp', name: 'ordered_datetime', nullable: true })
  orderedDateTime: Date;

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


   // One-to-Many relation with Orderstatus
   @ManyToOne(() => Orderstatus, (orderstatus) => orderstatus.id,{eager:true})
   @JoinColumn({ name: 'orderStatusId' })
   orderstatus: Orderstatus;
 
   // Many-to-One relation with Customer
   @ManyToOne(() => Customer, (customer) => customer.order, { eager: true }) // Eager fetch to load with the query
   customer: Customer;
 
   // Many-to-One relation with Restaurant
   @ManyToOne(() => Restuarent, (restaurant) => restaurant.order, { eager: true }) // Eager fetch to load with the query
   restaurant: Restuarent;
 
   // Many-to-Many relation with Menuitem
   @ManyToMany(() => Menuitem, (menuitem) => menuitem.orders,{cascade:true})
   @JoinTable() // Join table for many-to-many relations
   menuItems: Menuitem[];


      // @OneToMany(()=>Orderstatus,(orderstatus)=>orderstatus.order)
      // orderstatus:Orderstatus[]

      // @ManyToOne(()=>Customer,(customer)=>customer.order)
      // customer:Customer

      // @ManyToOne(()=>Restuarent,(restuarent)=>restuarent.order)
      // restuarent:Restuarent

      // @ManyToMany(() => Menuitem, (menuitem) => menuitem.orders)
      // @JoinTable() 
      // menuItems: Menuitem[];




      // @ManyToMany(()=>Menuitem,(menuitem)=>menuitem.orders,{cascade:true})
      // @JoinTable({name:"menuitems"})
      // menuitem=Menuitem[]

      @BeforeInsert()
      setOrderedTiming()
      {
        this.orderedDateTime=new Date()
      }

}
