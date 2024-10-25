import { Type } from 'class-transformer';
import { IsString, IsEmail, IsNotEmpty, Matches } from 'class-validator';





export class EmailDTO{
       
    @IsEmail({})
    @IsNotEmpty()
    email: string;
}

export class loginDto extends EmailDTO{

    @IsString()
    @IsNotEmpty()
    @Matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,{message:"Password must contain letters, numbers, and symbols."})
    password:string
}


export class restPasswordDto{
    
    @IsString()
    @IsNotEmpty()
    @Matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,{message:"Password must contain letters, numbers, and symbols."})
    currpassword:string

    @IsString()
    @IsNotEmpty()
    @Matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,{message:"Password must contain letters, numbers, and symbols."})
    password:string

    
    @IsString()
    @IsNotEmpty()
    @Matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,{message:"Password must contain letters, numbers, and symbols."})
    confirmpassword:string    
}

export class registrationDto extends loginDto
{
    @IsString()
    @IsNotEmpty() 
    firstName:string

   
    @IsString()
    @IsNotEmpty() 
    lastName:string
   
    @IsEmail({})
    @IsNotEmpty()
    email: string

    @IsString()
    @Matches(/^\d{11}$/, { message: 'Phone number must be exactly 11 digits.' })
    @IsNotEmpty()
    phoneNumber:string

}