import { Menugroup } from "src/modules/menugroup/entities/menugroup.entity";
import { Restuarent } from "src/modules/restuarent/entities/restuarent.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:"menu"})
export class Menu {

    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column({type:"varchar", length:225,name:"menu_name",nullable:false})
    name:string  
    
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

      @OneToOne(()=> Restuarent,(restuarent)=>restuarent.menu)
      restuarant:Restuarent

      @OneToMany(()=>Menugroup,(menugroup)=>menugroup.menu,{eager:true,cascade:true})
      menugroup:Menugroup[]
      // @OneToMany(() => MenuGroup, menuGroup => menuGroup.menu, { cascade: true })
}
