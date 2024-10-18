import { IsString, IsEmail, IsNotEmpty, IsEmpty, Matches, IsOptional } from 'class-validator';




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
    email: string;
}