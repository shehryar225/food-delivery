import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateMenuDto } from 'src/modules/menu/dto/create-menu.dto';
import { CreateMenuitemDto } from 'src/modules/menuitems/dto/create-menuitem.dto';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreateMenuGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;


  @IsArray()
  @ValidateNested({each:true})
  @Type(()=>CreateMenuitemDto)
  menuItems:CreateMenuitemDto[]


  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

    @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;


}