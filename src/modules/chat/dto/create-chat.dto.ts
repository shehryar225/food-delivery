import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateChatDto {
    
    @IsString()
    @IsNotEmpty()
    content:string
   
    @IsString()
    sender:string

    @IsString()
    recipient:string

}
