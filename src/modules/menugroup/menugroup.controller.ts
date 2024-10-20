import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenugroupService } from './menugroup.service';
import { CreateMenugroupDto } from './dto/create-menugroup.dto';


@Controller('menugroup')
export class MenugroupController {
  constructor(private readonly menugroupService: MenugroupService) {}

  // @Post()
  // create(@Body() createMenugroupDto: CreateMenugroupDto) {
  //   return this.menugroupService.create(createMenugroupDto);
  // }

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
