import { Menu } from "src/modules/menu/entities/menu.entity";
import { Menuitem } from "src/modules/menuitems/entities/menuitem.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"menugroup"})
export class Menugroup {

    
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column({type:"varchar", length:225,name:"menu_group_name",nullable:false})
    name:string

    @Column({type:"varchar", length:225,name:"decription",nullable:true})
    description:string
    
    @ManyToOne(()=> Menu,(menu)=> menu.menugroup)
    menu:Menu

    @OneToMany(() => Menuitem, menuItem => menuItem.menugroup, { cascade: true, onDelete: 'CASCADE',eager:true })
    menuItems: Menuitem[];
 
}
