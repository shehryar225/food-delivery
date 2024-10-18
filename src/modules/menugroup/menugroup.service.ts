import { Injectable } from '@nestjs/common';
import { CreateMenugroupDto } from './dto/create-menugroup.dto';
import { UpdateMenugroupDto } from './dto/update-menugroup.dto';

@Injectable()
export class MenugroupService {
  create(createMenugroupDto: CreateMenugroupDto) {
    return 'This action adds a new menugroup';
  }

  findAll() {
    return `This action returns all menugroup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menugroup`;
  }

  update(id: number, updateMenugroupDto: UpdateMenugroupDto) {
    return `This action updates a #${id} menugroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} menugroup`;
  }
}
