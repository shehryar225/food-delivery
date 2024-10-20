import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { ApiFeatures } from 'src/utils/features/apiFeatures';
import { UserRole } from 'src/enums/userRoles.enum';

@Injectable()
export class CustomerService {

  constructor(@InjectRepository(Customer) private customerRepository:Repository <Customer>, private authServices:AuthService) {}

  create(createCustomerDto: CreateCustomerDto) {
    return 'This action adds a new customer';
  }

  async findById(id:number): Promise<Customer | undefined>
    {
        return await this.customerRepository.findOne({
            where:{id:id,isVerified:true}
        })
    }

  async findOneByEmail(email:string)
  {
    try{
        return await this.customerRepository.findOne({
          where:{ email },
      });
    }
    catch(err)
    {
      throw err
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

}
