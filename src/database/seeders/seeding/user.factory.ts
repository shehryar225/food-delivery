
import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { UserRole } from 'src/enums/userRoles.enum';
import { Customer } from 'src/modules/customer/entities/customer.entity';

export const UserFactory = setSeederFactory(Customer, (faker: Faker) => {
    const user = new Customer();
   user.firstName = faker.name.firstName();  
  user.lastName = faker.name.lastName();    
  user.email = faker.internet.email();      
  user.password = faker.internet.password();
  user.role = UserRole.USER;
  user.isVerified=true 
  
    return user;
  });
