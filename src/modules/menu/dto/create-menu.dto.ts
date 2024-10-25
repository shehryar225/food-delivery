import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { CreateMenuGroupDto } from "src/modules/menugroup/dto/create-menugroup.dto";

export class CreateMenuDto {
    
    @IsString()
    @IsNotEmpty()
    name:string

    @IsArray()
    @ValidateNested({each:true})
    @Type(()=>CreateMenuGroupDto)
    menugroup:CreateMenuGroupDto[]
}
