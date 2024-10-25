import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenugroupService } from './menugroup.service';
import { CreateMenuGroupDto } from './dto/create-menugroup.dto';


@Controller('/restuarent/menu')
export class MenugroupController {
  constructor(private readonly menugroupService: MenugroupService) {}


  @Post("/:menuid/menugroup")
  create(@Param('menuid') menuId: string,@Body() createMenugroupDto: CreateMenuGroupDto) {
    return this.menugroupService.create(menuId,createMenugroupDto);
  }

  @Delete("/menugroup/:id")
  delete(@Param('id') id: string,)
  {
    return this.menugroupService.delete(id)
  }
  // @Get()
  // findAll() {
  //   return this.menugroupService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.menugroupService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMenugroupDto: UpdateMenugroupDto) {
  //   return this.menugroupService.update(+id, updateMenugroupDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.menugroupService.remove(+id);
  // }
}
