import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuitemDto } from './dto/create-menuitem.dto';
import { Menuitem } from './entities/menuitem.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Menugroup } from '../menugroup/entities/menugroup.entity';
import { createResponse } from 'src/utils/response/responseHandler';

@Injectable()
export class MenuitemsService {
  
  constructor(
    @InjectRepository(Menuitem) private MenuitemsRepository:Repository <Menuitem>,
    @InjectRepository(Menugroup) private menugroupRepository:Repository<Menugroup>
    ){}

 async create(menugroupid:string,createMenuitemDto: CreateMenuitemDto) {
   
    try{

      const checkMenugroup=await this.menugroupRepository.findOne({where:{id:menugroupid}})

      const menuItems=this.MenuitemsRepository.create(createMenuitemDto);

      menuItems.menugroup=checkMenugroup

      await this.MenuitemsRepository.save(menuItems)

      return createResponse({},`New item added in ${checkMenugroup.name} section`,undefined)
    }
    catch(err)
    {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  findAll() {
    return `This action returns all menuitems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menuitem`;
  }

  // update(id: number, updateMenuitemDto: UpdateMenuitemDto) {
  //   return `This action updates a #${id} menuitem`;
  // }

 async delete(id: string) {
    
    try{
        const deleteItem=await this.MenuitemsRepository.delete(id)

        if(deleteItem.affected===0) throw new NotFoundException("Menu Item not Found")
        
        return createResponse({},"Menu Item deleted Sucessfully",undefined)  
    }
    catch(err)
    {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
