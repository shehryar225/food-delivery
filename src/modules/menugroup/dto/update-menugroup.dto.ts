import { PartialType } from '@nestjs/mapped-types';
import { CreateMenugroupDto } from './create-menugroup.dto';

export class UpdateMenugroupDto extends PartialType(CreateMenugroupDto) {}
