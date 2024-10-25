import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { ApiFeatures } from 'src/utils/features/apiFeatures';
import { UserRole } from 'src/enums/userRoles.enum';
import { createResponse } from 'src/utils/response/responseHandler';

@Injectable()
export class CustomerService {

  constructor(@InjectRepository(Customer) private customerRepository:Repository <Customer>, private authServices:AuthService) {}

  create(createCustomerDto: CreateCustomerDto) {
    return 'This action adds a new customer';
  }

  async profile(req:Request)
  {
     const {iat,exp,...others} =req["decodedData"]

     return createResponse(others,"User Profile",HttpStatus.OK)  
  }

  async findById(id:string): Promise<Customer | undefined>
    {
        return await this.customerRepository.findOne({
            where:{id:id,isVerified:true}
        })
    }

  async findOneByEmail(email:string)
  {
    try{
        return await this.customerRepository.findOne({
          where:{ email,isVerified:true },
      });
    }
    catch(err)
    {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }  
  async findAll(queryParams: any): Promise<{ customers: Customer[]; total: number }> {
    const queryBuilder=this.customerRepository.createQueryBuilder('customer').where({role:UserRole.USER})

    queryBuilder.select([
      'customer.id',
      'customer.firstName',
      'customer.lastName',
      'customer.email',
      'customer.isVerified',
      'customer.role'
    ])

    const features = new ApiFeatures(queryBuilder, queryParams)
    .filter()
    .sort()
    .paginate();

  const [customers, total] = await features.query.getManyAndCount();

  return { customers, total };
  }

  async getUserRole(id:string):Promise<Customer>
  {
      return await this.customerRepository.findOne({where:{id}});
  }

}
