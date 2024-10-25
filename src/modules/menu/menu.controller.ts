import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';

import { Roles } from 'src/common/decorators/role.decorators';
import { UserRole } from 'src/enums/userRoles.enum';

@Controller('restuarent/menu')

export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post(":id/create")
  create(@Param('id') id:string, @Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(id,createMenuDto);
  }

  @Get("")
  get()
  {
    return this.menuService.getMenu();
  }

  @Get("/:id")
  getOne(@Param("id") id:string)
  {
    return this.menuService.getOneMenu(id)
  }
  // @Get()
  // findAll() {
  //   return this.menuService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.menuService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
  //   return this.menuService.update(+id, updateMenuDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.menuService.remove(+id);
  // }
}
