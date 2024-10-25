import { Module } from '@nestjs/common';
import { RestuarentService } from './restuarent.service';
import { RestuarentController } from './restuarent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restuarent } from './entities/restuarent.entity';
import { Menu } from '../menu/entities/menu.entity';
import { Menugroup } from '../menugroup/entities/menugroup.entity';
import { Menuitem } from '../menuitems/entities/menuitem.entity';
import { MenuModule } from '../menu/menu.module';
import { AuthModule } from '../auth/auth.module';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restuarent, Menu]),
    AuthModule,
    CustomerModule // Register Restaurant repository
  ],
  providers: [RestuarentService],
  controllers: [RestuarentController],
  exports: [RestuarentService],
})
export class RestuarentModule {}
