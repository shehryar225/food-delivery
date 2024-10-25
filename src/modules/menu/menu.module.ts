import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restuarent } from '../restuarent/entities/restuarent.entity';
import { Menu } from './entities/menu.entity';
import { RestuarentModule } from '../restuarent/restuarent.module';
import { Menugroup } from '../menugroup/entities/menugroup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Menu,Restuarent,Menugroup]),
  ],
  controllers: [MenuController],
  providers: [MenuService],
  exports:[MenuService]
})
export class MenuModule {}
