import { Module } from '@nestjs/common';
import { RestuarentService } from './restuarent.service';
import { RestuarentController } from './restuarent.controller';

@Module({
  controllers: [RestuarentController],
  providers: [RestuarentService],
})
export class RestuarentModule {}
