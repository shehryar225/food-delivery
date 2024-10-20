import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "src/enums/userRoles.enum";
import * as bcrypt from 'bcrypt';
@Entity({name:"customer"})
export class Customer {

    @PrimaryGeneratedColumn()
    id:number

    @Column({type:"varchar", length:225,name:"first_name",nullable:false})
    firstName:string

    @Column({type:"varchar", length:225,name:"last_name",nullable:false})
    lastName:string

    
    @Column({type: 'varchar', length: 255,name:"email",unique:true,nullable:true})
    email:string

    @Column({type:'varchar', length: 255,name:"password"})
    password:string

    @Column({type:'boolean',name:"is_verified",default:false})
    isVerified:boolean

    @Column({ type:'enum',enum:UserRole,name:"role", default:UserRole.USER })
    role: UserRole;

    @Column({ type: 'timestamp', nullable: true,name:"password_update_at" }) 
    passwordUpdatedAt: Date;


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




      @BeforeInsert()
      @BeforeUpdate()
      async hashPassword()
      {
        console.log(this.password)
        if (this.password && !this.password.startsWith('$2b$')) {  
            this.password = await bcrypt.hash(this.password, 10);
            console.log("Password hashed:", this.password);
        }
      }

    
}
