import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderstatusService } from './orderstatus.service';
import { CreateOrderstatusDto } from './dto/create-orderstatus.dto';

@Controller('orderstatus')
export class OrderstatusController {
  constructor(private readonly orderstatusService: OrderstatusService) {}

  @Post("create")
  create(@Body() createOrderstatusDto: CreateOrderstatusDto) {
    return this.orderstatusService.addOrderStatus(createOrderstatusDto);
  }

  @Get("orderstatus")
  findAll() {
    return this.orderstatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderstatusService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderstatusDto: UpdateOrderstatusDto) {
  //   return this.orderstatusService.update(+id, updateOrderstatusDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderstatusService.remove(+id);
  }
}
