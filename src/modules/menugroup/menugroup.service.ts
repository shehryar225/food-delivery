import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuGroupDto } from './dto/create-menugroup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menugroup } from './entities/menugroup.entity';
import { Repository } from 'typeorm';
import { Menu } from '../menu/entities/menu.entity';
import { createResponse } from 'src/utils/response/responseHandler';
import { Restuarent } from '../restuarent/entities/restuarent.entity';

@Injectable()
export class MenugroupService {
 


  constructor(
    @InjectRepository(Menugroup) private MenuGroupRepository:Repository <Menugroup>,
    @InjectRepository(Menu) private menuRepository:Repository<Menu>
    ){}


 async create(menuId:string,createMenugroupDto: CreateMenuGroupDto) {
  try{
    const checkMenu=await this.menuRepository.findOne({where:{id:menuId}})

    if(!checkMenu) throw new ConflictException("This menu not found")

    const menuGroup=this.MenuGroupRepository.create(createMenugroupDto)
    
    menuGroup.menu=checkMenu

    await this.MenuGroupRepository.save(menuGroup);

    return createResponse({},"Menu Group added to Menu",undefined)

  }
  catch(err)
  {
    throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
    
  }

  async delete(id:string)
  {
    try{

      const deletegroup=await this.MenuGroupRepository.delete(id);

      if(deletegroup.affected===0) throw new NotFoundException("Menu Group not found")

      return createResponse({},"Menu Group deleted Successfully",undefined)  
    }
    catch(err)
    {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // findAll() {
  //   return `This action returns all menugroup`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} menugroup`;
  // }

  // update(id: number, updateMenugroupDto: UpdateMenugroupDto) {
  //   return `This action updates a #${id} menugroup`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} menugroup`;
  // }
}
