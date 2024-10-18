import { Module } from '@nestjs/common';
import { MenugroupService } from './menugroup.service';
import { MenugroupController } from './menugroup.controller';

@Module({
  controllers: [MenugroupController],
  providers: [MenugroupService],
})
export class MenugroupModule {}
