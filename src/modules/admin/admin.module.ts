import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { CustomerModule } from '../customer/customer.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[CustomerModule,AuthModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
