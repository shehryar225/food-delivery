import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { Customer } from '../customer/entities/customer.entity';
import { Restuarent } from '../restuarent/entities/restuarent.entity';
import { Menuitem } from '../menuitems/entities/menuitem.entity';
import { Orderstatus } from '../orderstatus/entities/orderstatus.entity';
import { orderStatuses } from 'src/enums/orderStatuses.enum';
import { createResponse } from 'src/utils/response/responseHandler';
import { OrderGateway } from './order.gateway';
// import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {

  constructor(
    private readonly orderGateway: OrderGateway,
    @InjectRepository(Order) private orderRepository:Repository <Order>,
    @InjectRepository(Customer) private customerRepository:Repository<Customer>,
    @InjectRepository(Restuarent) private restuarentRepository:Repository<Restuarent>,
    @InjectRepository(Menuitem) private menuItemsRepository:Repository<Menuitem>,
    @InjectRepository(Orderstatus) private orderStatusRepository:Repository<Orderstatus>
    ){}

  async create(createOrderDto: CreateOrderDto) {
    
    try{

     const {customer,restuarant,menuItems} =createOrderDto
     
     const [checkCustomer,checkRestuarent,checkMenuItems,checkOrderStatus]=await Promise.all([
      await this.customerRepository.findOne({where:{id:customer}}),
      await this.restuarentRepository.findOne({where:{id:restuarant}}),
      await this.menuItemsRepository.findByIds(menuItems),
      await this.orderStatusRepository.findOne({where:{status:orderStatuses.ORDERED}})
     ])

     if (!checkCustomer || !checkRestuarent || !checkMenuItems || checkMenuItems.length === 0) {
      throw new NotFoundException(
        !checkCustomer
          ? 'Customer not found'
          : !checkRestuarent
          ? 'Restaurant not found'
          : 'Menu items not found',
      );
    }

  
    const order = this.orderRepository.create(
      { address: createOrderDto.address,
        price: createOrderDto.price,
        isActive: createOrderDto.isActive, 
        orderedDateTime: new Date(),
        orderstatus:checkOrderStatus,
        customer: checkCustomer, 
        restaurant: checkRestuarent,
        menuItems: checkMenuItems, 
      })
  
      if(order.price!==checkMenuItems[0].price) throw new BadRequestException("Please add correct price")

      await this.orderRepository.save(order)

      
      this.orderGateway.sendOrderNotification(customer, 'Your order has been successfully created!');

      return createResponse({},"New Order Created",undefined);
    }
    catch(err)
    {

      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  async orders()
  {
    try{
        const getorders=await this.orderRepository.find();

        return {
          data:getorders
        }
    }
    catch(err)
    {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
