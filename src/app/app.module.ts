import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from 'modules/customer/customer.module';
import { AuthModule } from 'modules/auth/auth.module';

@Module({
  imports: [ConfigModule,AuthModule,CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
