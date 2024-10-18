import { HttpStatus, Injectable } from '@nestjs/common';
import { Customer } from '../customer/entities/customer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { registrationDto } from './dto/create-auth.dto';
import { createResponse } from 'utils/response/responseHandler';
import { ApiResponse } from 'interfaces/apiResponse.interface';


@Injectable()
export class AuthService {
  
  constructor(@InjectRepository(Customer) private userRepository:Repository <Customer>,
    private jwtService: JwtService) {}
  
 async registration(body:registrationDto):Promise<ApiResponse<any>> 
  { 
    try{
      const newUser = this.userRepository.create(body);

      const user= await this.userRepository.save(newUser)

      const gettoken=user.generateTempToken({id:user.id,email:user.email,role:user.role},this.jwtService)
    
      return createResponse({},"User Registered",HttpStatus.OK,gettoken)  
    } 
    catch(err)
    {
        throw err
    }
    
  }

  // async function verifyEmail(params):Promise<ApiResponse<any>> 
  // {
  //   try{

  //   }
  //   catch(err)
  //   {
  //     throw err
  //   }
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
