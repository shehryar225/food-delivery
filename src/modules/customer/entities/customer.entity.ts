import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { JwtService } from '@nestjs/jwt';
import { UserRole } from "enums/userRoles.enum";

@Entity()
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

    
    //  generateTempToken(obj:,jwtservice:JwtService): string {
        
    //     try{
    //             const payload={id:obj.id,email:obj.email,role:obj.role}
    //             return jwtservice.sign(payload,{expiresIn:obj.expiresIn})

    //     }catch(err)
    //     {
    //         throw err
    //     }
    //         }
}
