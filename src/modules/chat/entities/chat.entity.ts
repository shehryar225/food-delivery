import { Customer } from "src/modules/customer/entities/customer.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:"chat"})
export class Chat {

   @PrimaryGeneratedColumn("uuid")
   id:string;

    @Column()
    content:string;


    @ManyToOne(() => Customer, (user) => user.messages, { eager: true })
    sender: Customer;

    @ManyToOne(() => Customer, { nullable: true,eager:true })
    recipient: Customer; 


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


}

