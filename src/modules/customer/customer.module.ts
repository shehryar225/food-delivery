import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer } from './entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Order } from '../order/entities/order.entity';
import { Chat } from '../chat/entities/chat.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Customer,Order,Chat]),
  AuthModule,
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports:[CustomerService]
})
export class CustomerModule {}
