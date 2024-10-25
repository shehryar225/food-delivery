import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { RestuarentService } from '../restuarent/restuarent.service';
import { Restuarent } from '../restuarent/entities/restuarent.entity';
import { createResponse } from 'src/utils/response/responseHandler';


@Injectable()
export class MenuService {

  constructor(@InjectRepository(Menu) private menuReposirtoy:Repository <Menu>,
  @InjectRepository(Restuarent) private restuarentRepository:Repository<Restuarent>) {}

 async create(id:string,createMenuDto: CreateMenuDto) {
    
  try{

    const checkRestuarent=await this.restuarentRepository.findOne({where:{id}})

    if(!checkRestuarent) throw new NotFoundException("Retuarent Not Found")

    if(checkRestuarent.menu!==null) throw new ConflictException("This restuarent have already a menu card")  
   
    const menu=this.menuReposirtoy.create(createMenuDto)
    menu.restuarant=checkRestuarent

    const savedMenu=await this.menuReposirtoy.save(menu)
    checkRestuarent.menu=savedMenu

    await this.restuarentRepository.save(checkRestuarent)

    return createResponse({},`Menu added to ${checkRestuarent.name}`,HttpStatus.CREATED,undefined)  
    
  }
  catch(err)
  {
    throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
    
  }

  async getMenu()
  {
    try{

      const getmenu=await this.menuReposirtoy.find()

      return {
        data:getmenu
      }
    }catch(err)
    {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

 async getOneMenu(id:string)
 {
    try{
      const getonemenu=await this.menuReposirtoy.findOne({where:{id}})

      if(!getonemenu) throw new NotFoundException("Menu Not Found")

      return createResponse(getonemenu,`${getonemenu.name} menu`,undefined)  

    }
    catch(err)
    {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
 }
}
