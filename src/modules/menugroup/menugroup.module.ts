import { Module } from '@nestjs/common';
import { MenugroupService } from './menugroup.service';
import { MenugroupController } from './menugroup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from '../menu/entities/menu.entity';
import { Menugroup } from './entities/menugroup.entity';
import { Restuarent } from '../restuarent/entities/restuarent.entity';
import { Menuitem } from '../menuitems/entities/menuitem.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Menu,Menugroup,Menuitem]), // Register Restaurant repository
  ],
  controllers: [MenugroupController],
  providers: [MenugroupService],
})
export class MenugroupModule {}
