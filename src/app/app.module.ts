import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestuarentModule } from 'src/modules/restuarent/restuarent.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { CustomerModule } from 'src/modules/customer/customer.module';
import { ConfigModule } from 'src/config/config.module';
import { AdminModule } from 'src/modules/admin/admin.module';

@Module({
  imports: [ConfigModule,CustomerModule,AuthModule,RestuarentModule,AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
