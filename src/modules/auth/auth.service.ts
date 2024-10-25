import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Customer } from '../customer/entities/customer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { loginDto, registrationDto, restPasswordDto } from './dto/create-auth.dto';
import { createResponse } from 'src/utils/response/responseHandler';
import { ApiResponse } from 'src/interfaces/apiResponse.interface';
import { tempToken } from 'src/interfaces/tempToken.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  
  constructor(@InjectRepository(Customer) private customerRepository:Repository <Customer>,
    private jwtService: JwtService) {}
  
 async registration(body:registrationDto):Promise<ApiResponse<any>> 
  { 
    try{

      const newUser = this.customerRepository.create(body);

      const user= await this.customerRepository.save(newUser)

      // const gettoken=user.generateTempToken({id:user.id,email:user.email,role:user.role},this.jwtService)
    
      const gettoken=this.generateTempToken({id:user.id,type:"temporary",expiresIn:'5m'})

      return createResponse({},`Registration Successfully Please verify your account http://localhost:3000/auth/verifycustomeremail?token=${gettoken}`,HttpStatus.CREATED,undefined)  
    } 
    catch(err)
    {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }

 async verifyAccount(query:Record<string,any>):Promise<{message:string}>
 {

  try{
  const {token}=query;

  if(!token) throw new UnauthorizedException("Token Required")

  const customer=new Customer()

  const checkToken=await this.validateToken(token)
    
  const user=await this.customerRepository.findOne({where:{id:checkToken.id}});
       
  if (!user) throw new  NotFoundException('User not found');
   
  if(user.isVerified) throw new BadRequestException('You are already Verified');

  if(!checkToken) throw new BadRequestException('Invalid token');

  if (checkToken.exp && checkToken.exp < Date.now() / 1000)  throw new BadRequestException('Verification token has expired. Please request a new verification email.');
      
  user.isVerified=true
  
  await this.customerRepository.save(user);

  return { message: 'Email successfully verified!' }
  
  }catch(err)
  {
    console.log("An erro occurs",err)
    
    throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
} 

async login(body:loginDto,existUser:any):Promise<any>
{
  const {password}=body

  try
  { 

    if (!existUser.isVerified) throw new UnauthorizedException('Please verify your email before logging in.');

    if(!(await bcrypt.compare(password,existUser.password))) throw new UnauthorizedException(`Invalid Credentials`);  

    const generateJwt=this.generateToken({id:existUser.id,username:existUser.userName,email:existUser.email,role:existUser.role,expiresIn:'1h'})
  
    return createResponse(undefined,`User Logged In`,HttpStatus.OK,generateJwt)  
  }
  catch(err)
  {
    throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

async resedEmail(email:string):Promise<{message:string}>
{
    try{
    const checkEmail =await this.customerRepository.findOne({where:{email:email,isVerified: false}})

    // if(!checkEmail) throw new BadRequestException(`${!checkEmail?"User not found":"Your are already verified"}`);

    if (!checkEmail) throw new NotFoundException('User not found.');
      
    if (checkEmail.isVerified) throw new BadRequestException('You are already verified.');
      
    const reGenerateJwt=this.generateTempToken({id:checkEmail.id,type:"temporary",expiresIn:'5m'})

    return{message:`A link has been sent to your email account http://localhost:3000/auth/verifycustomeremail/${reGenerateJwt}`}
    
    }
    catch(err)
    {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }    
}

async resentPasswordRequest(email:string):Promise<{message:string}>
{
    try{

        const checkEmail=await this.customerRepository.findOne({where:{email:email}})

        if(!checkEmail) throw new NotFoundException("Email not found")

        const generateJwt=this.generateTempToken({id:checkEmail.id,type:"temporary",expiresIn:'5m'}) 

        await this.customerRepository.save(checkEmail);

        return {message:`A link has been sent to your email  http://localhost:3000/auth/verifyresendpassword/${generateJwt}`}
    
    }
    catch(err)
    {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    } 
}

async verifyResetEmail(param,body:restPasswordDto):Promise<{message:string}>
{
    const currpassword=body.currpassword
    const newpassword=body.password
    const confirmpassword=body.confirmpassword
    const {token}=param
    try{

        const checkToken=await this.validateToken(token)

        if(!checkToken) throw new UnauthorizedException('Invalid token');

        if (checkToken.exp && checkToken.exp < Date.now() / 1000)  throw new BadRequestException('Verification token has expired. Please request a new verification email.');
              
        const user=await this.customerRepository.findOne({where:{email:checkToken.email}});    

        const currentpasswordCheck=await bcrypt.compare(currpassword, user.password)

        if(!currentpasswordCheck || newpassword===currpassword) throw new BadRequestException(currentpasswordCheck===true?"Please enter your current password correctlty":"You're entering your current password in new password field")

        if (newpassword !== confirmpassword)  throw new BadRequestException('New password and confirm password do not match.');
        
        checkToken.password=await bcrypt.hash(newpassword, 10)
        await this.customerRepository.save(checkToken);

        return { message: 'Your password has been reset successfully'}
    }
    catch(err)
    {
        console.log("An Error Occurs ",err)
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }  

}

  
  generateTempToken(obj:tempToken): string {
        
    try{
            const payload={id:obj.id,type:obj.type}
            return this.jwtService.sign(payload,{expiresIn:obj.expiresIn})

    }catch(err)
    {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  generateToken(obj): string {
    const payload = {id:obj.id ,username:obj.username,email:obj.email,role:obj.role }; 
    return this.jwtService.sign(payload,{ expiresIn: obj.expiresIn }); 
  }


  validateToken(token: string) {
    try{

    return this.jwtService.verify(token, {
        secret : process.env.JWT_SECRET_KEY
    });
    
    } catch (error) {
    throw new BadRequestException('Invalid token');
    }
}
}
