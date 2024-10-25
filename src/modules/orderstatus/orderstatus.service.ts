import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderstatusDto } from './dto/create-orderstatus.dto';
import { Order } from '../order/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orderstatus } from './entities/orderstatus.entity';
import { createResponse } from 'src/utils/response/responseHandler';

@Injectable()
export class OrderstatusService {
 
  constructor(
    @InjectRepository(Order) private orderRepository:Repository <Order>,
    @InjectRepository(Orderstatus) private orderStatusRepository:Repository<Orderstatus>
    ){}
 
  async addOrderStatus(createOrderstatusDto: CreateOrderstatusDto) {

      const {status}=createOrderstatusDto
        try{
            const checkOrderStatus=await this.orderStatusRepository.findOne({where:{status:status}})

            if(checkOrderStatus) throw new ConflictException("Order Status already exist")

            const orderStatus=this.orderStatusRepository.create(createOrderstatusDto)
    
            await this.orderStatusRepository.save(orderStatus);

            return createResponse({},"Order Status Added",undefined);
        }
        catch(err)
        {
          throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

 async findAll() {

  try{

    const getallStatus=await this.orderStatusRepository.find();

    return {
      data:getallStatus
    }
  }
  catch(err)
  {
    throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }

  findOne(id: number) {
    return `This action returns a #${id} orderstatus`;
  }

  // update(id: number, updateOrderstatusDto: UpdateOrderstatusDto) {
  //   return `This action updates a #${id} orderstatus`;
  // }

  remove(id: number) {
    return `This action removes a #${id} orderstatus`;
  }
}
