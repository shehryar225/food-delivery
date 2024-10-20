import { CustomerService } from 'src/modules/customer/customer.service';
import { AuthService } from './../auth.service';
import { CanActivate, ConflictException, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from 'rxjs';


@Injectable()
export class RegisterGuard implements CanActivate
{
    constructor(private readonly customerservice: CustomerService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        
        const request = context.switchToHttp().getRequest();
        const { email } = request.body;

        const userExists = await this.customerservice.findOneByEmail(email);
        
        console.log(userExists)
        if (userExists) {
            throw new ConflictException(`Email already Exist`);
        }

        return true
    }
}