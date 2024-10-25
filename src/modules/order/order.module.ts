import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Customer } from '../customer/entities/customer.entity';
import { Restuarent } from '../restuarent/entities/restuarent.entity';
import { Menuitem } from '../menuitems/entities/menuitem.entity';
import { Orderstatus } from '../orderstatus/entities/orderstatus.entity';
import { OrderstatusModule } from '../orderstatus/orderstatus.module';
import { AuthModule } from '../auth/auth.module';
import { CustomerModule } from '../customer/customer.module';
import { OrderGateway } from './order.gateway';

@Module({
  imports:[TypeOrmModule.forFeature([Order,Customer,Restuarent,Menuitem,Orderstatus]),
  OrderstatusModule,
  AuthModule,
  CustomerModule
  ],
  controllers: [OrderController],
  providers: [OrderService,OrderGateway],
  exports:[OrderGateway]
})
export class OrderModule {}
