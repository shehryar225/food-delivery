import { IsArray, IsBoolean, IsDate, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";
import { orderPaid } from "src/enums/orderPaid.enum";
import { Orderstatus } from "src/modules/orderstatus/entities/orderstatus.entity";

export class CreateOrderDto {

    @IsString()
    @IsNotEmpty()
    address: string;
  
    @IsNumber()
    @IsNotEmpty()
    price: number;
  
    @IsEnum(orderPaid)
    @IsNotEmpty()
    isActive: orderPaid;
  
    @IsOptional()
    @IsDate()
    takenOverDateTime?: Date;
  
    @IsOptional()
    @IsDate()
    preparedDateTime?: Date;
  
    @IsOptional()
    @IsDate()
    orderedDateTime?: Date;
  
    // Assuming that customer is passed as an ID (string)
    @IsNumberString()
    @IsNotEmpty()
    customer: string;
  
    // Assuming that restaurant is passed as an ID (string)
    @IsNumberString()
    @IsNotEmpty()
    restuarant: string;
  
    // For order status, assuming you are passing the status entity or its ID
    @IsEmpty()
    orderstatus: number; // You may use a string or number if this is an ID
  
    @IsArray()
    @IsNumber({}, { each: true }) // Expecting an array of menu item IDs
    @IsNotEmpty()
    menuItems: number[];
  }