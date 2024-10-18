import { Injectable } from '@nestjs/common';
import { CreateRestuarentDto } from './dto/create-restuarent.dto';
import { UpdateRestuarentDto } from './dto/update-restuarent.dto';

@Injectable()
export class RestuarentService {
  create(createRestuarentDto: CreateRestuarentDto) {
    return 'This action adds a new restuarent';
  }

  findAll() {
    return `This action returns all restuarent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restuarent`;
  }

  update(id: number, updateRestuarentDto: UpdateRestuarentDto) {
    return `This action updates a #${id} restuarent`;
  }

  remove(id: number) {
    return `This action removes a #${id} restuarent`;
  }
}
