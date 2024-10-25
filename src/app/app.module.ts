import { Module } from '@nestjs/common';
import { RestuarentModule } from 'src/modules/restuarent/restuarent.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { CustomerModule } from 'src/modules/customer/customer.module';
import { ConfigModule } from 'src/config/config.module';
import { AdminModule } from 'src/modules/admin/admin.module';
import { OrderModule } from 'src/modules/order/order.module';
import { MenuModule } from 'src/modules/menu/menu.module';
import { OrderstatusModule } from 'src/modules/orderstatus/orderstatus.module';
import { MenugroupModule } from 'src/modules/menugroup/menugroup.module';
import { MenuitemsModule } from 'src/modules/menuitems/menuitems.module';
import { ChatModule } from 'src/modules/chat/chat.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    ConfigModule,ChatModule,CustomerModule,AuthModule,RestuarentModule,AdminModule,OrderModule,MenuModule,OrderstatusModule,MenugroupModule,MenuitemsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
