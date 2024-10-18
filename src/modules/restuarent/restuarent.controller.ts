import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestuarentService } from './restuarent.service';
import { CreateRestuarentDto } from './dto/create-restuarent.dto';
import { UpdateRestuarentDto } from './dto/update-restuarent.dto';

@Controller('restuarent')
export class RestuarentController {
  constructor(private readonly restuarentService: RestuarentService) {}

  @Post()
  create(@Body() createRestuarentDto: CreateRestuarentDto) {
    return this.restuarentService.create(createRestuarentDto);
  }

  @Get()
  findAll() {
    return this.restuarentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restuarentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestuarentDto: UpdateRestuarentDto) {
    return this.restuarentService.update(+id, updateRestuarentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restuarentService.remove(+id);
  }
}
