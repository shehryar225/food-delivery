import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { restuarentStatus } from "src/enums/restuarentStatus.enum";
import { CreateMenuDto } from "src/modules/menu/dto/create-menu.dto";
import { CreateOrderDto } from "src/modules/order/dto/create-order.dto";

export class CreateRestuarentDto {

    @IsString()
    @IsNotEmpty() 
    name:string

    @IsString()
    @IsNotEmpty() 
    description:string

    @IsString()
    @IsNotEmpty() 
    location:string

    @IsOptional()
    @IsEnum(restuarentStatus)
    isActive:restuarentStatus

    @IsOptional()
    @IsArray()
    @ValidateNested({each:true})
    @Type(()=>CreateMenuDto)
    menu:CreateMenuDto

    // @IsArray()
    // @ValidateNested({each:true})
    // @Type(()=>CreateOrderDto)
    // order:CreateOrderDto[]
}
