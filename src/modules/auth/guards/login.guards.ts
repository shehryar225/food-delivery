import { CustomerService } from 'src/modules/customer/customer.service';
import { AuthService } from '../auth.service';
import { BadRequestException, CanActivate, ConflictException, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from 'rxjs';
import { loginDto } from '../dto/create-auth.dto';


@Injectable()
export class LoginGuard implements CanActivate
{
    constructor(private readonly customerservice: CustomerService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        
        const request = context.switchToHttp().getRequest();
        const { email,password }:loginDto = request.body;

        if(!email || !password) throw new BadRequestException(`${!email?"Email":"Password"} must be required`);
    

        const userExists = await this.customerservice.findOneByEmail(email);
        

        if(!userExists) throw new UnauthorizedException("Email not Found")

        request.data=userExists
        return true
    }
}