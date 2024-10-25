import { Module } from '@nestjs/common';
import { OrderstatusService } from './orderstatus.service';
import { OrderstatusController } from './orderstatus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../order/entities/order.entity';
import { Orderstatus } from './entities/orderstatus.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Order,Orderstatus]),
],
  controllers: [OrderstatusController],
  providers: [OrderstatusService],
  exports:[OrderstatusService]
})
export class OrderstatusModule {}
