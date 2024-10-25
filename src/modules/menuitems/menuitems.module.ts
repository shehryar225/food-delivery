import { Module } from '@nestjs/common';
import { MenuitemsService } from './menuitems.service';
import { MenuitemsController } from './menuitems.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menuitem } from './entities/menuitem.entity';
import { Menugroup } from '../menugroup/entities/menugroup.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Menuitem,Menugroup]), 
  ],
  controllers: [MenuitemsController],
  providers: [MenuitemsService],
  exports:[MenuitemsService]
})
export class MenuitemsModule {}
