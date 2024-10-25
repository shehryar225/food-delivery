import { IsEmpty, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMenuitemDto {
    @IsString()
    @IsNotEmpty()
    name:string

    @IsString()
    @IsEmpty()
    description:string

    @IsInt({ message: 'Price must be an integer.' }) 
    @IsNotEmpty()
    price:number
}
