import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestuarentDto } from './dto/create-restuarent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restuarent } from './entities/restuarent.entity';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/interfaces/apiResponse.interface';
import { createResponse } from 'src/utils/response/responseHandler';
import { Menu } from '../menu/entities/menu.entity';
import { ApiiFeatures } from 'src/utils/features/Apiifeatures';


@Injectable()
export class RestuarentService {


  constructor(
    @InjectRepository(Restuarent) private restuarentRepository:Repository <Restuarent>,
    @InjectRepository(Menu) private menuRepository:Repository<Menu>){}

  async create(createRestuarentDto: CreateRestuarentDto):Promise<ApiResponse<any>> {
   
    try{

      const checkRestuarent=await this.restuarentRepository.findOne({where:{name:createRestuarentDto.name}});

      if(checkRestuarent) throw new ConflictException("Restuarent name already registered")

      const restuarent=this.restuarentRepository.create(createRestuarentDto)
      
      if(createRestuarentDto.menu)
        {
            const menu=this.menuRepository.create(createRestuarentDto.menu)
            restuarent.menu=menu  
        }  
      
      const newRestuarent=await this.restuarentRepository.save(restuarent)

      return createResponse({},`New Restuarent Created`,HttpStatus.CREATED,undefined)  
    }
    catch(err)
    {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
   
  }

  async getRestuarents(query:any)
  {

    // const getRestuarent=await this.restuarentRepository.find();

    // return {
    //   data:getRestuarent
    // }
    try{
      const { page=1, limit=10, sort, filter } = query;

      // Create a query builder
      const queryBuilder = this.restuarentRepository.createQueryBuilder('restuarant');
  

      const relationMap: { [key: string]: string } = {
        menu: "restuarant.menu",
        menugroup: "menu.menugroup",
        menuItems: "menugroup.menuItems",
      };


      // parent:"restuarant",
      // relations: ["menu",'menugroup',"menuItems"], // Get relations from query
      // console.log(relations.split(','))
      const apiFeatures = new ApiiFeatures(queryBuilder, {
        page: (page * 1),
        limit: (limit * 1),
        sort,
        filter,
        relationMap
      });
  
      // Load relations, apply filters, sorting, and paginate
      apiFeatures.loadRelations().applyFilters().applySorting();
  
      // Paginate and return response
      return await apiFeatures.paginate();
    }  
    catch(err)
    {
      throw err
    }
  }

  async getOneRestuarent(id:string)
  {
    try{
        const getRestuarent=await this.restuarentRepository.findOne({where:{id}})

        if(!getRestuarent) throw new NotFoundException("Restuarent Not Found")

        return createResponse(getRestuarent,"Restuarent",undefined)  
    }
    catch(err)
    {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
