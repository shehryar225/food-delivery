import { PartialType } from '@nestjs/mapped-types';
import { CreateRestuarentDto } from './create-restuarent.dto';

export class UpdateRestuarentDto extends PartialType(CreateRestuarentDto) {}
