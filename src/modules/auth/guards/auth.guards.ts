import { CustomerService } from 'src/modules/customer/customer.service';
import { AuthService } from './../auth.service';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from 'rxjs';


@Injectable()
export class AuthsGuard implements CanActivate{

    constructor(private readonly authService:AuthService,private readonly customer:CustomerService){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
     
        
        const request = context.switchToHttp().getRequest();
        const { authorization } = request.headers;
        
        if (!authorization || !authorization.startsWith('Bearer ')) {
            throw new UnauthorizedException('Please log in first');
          }

         
        const authToken = authorization.split(' ')[1]; // This will get the token after 'Bearer '
          
         
    try {
        const decodedData = await this.authService.validateToken(authToken);
        request['decodedData'] = decodedData;
             
        const getUser=await this.customer.findOneByEmail(decodedData.email);
        
        if (getUser?.passwordUpdatedAt > new Date(decodedData?.iat * 1000)) throw new UnauthorizedException('Token is no longer valid. Please log in again.');
  
        return true;
      } catch (error) {
        console.log('AuthGuard Error:', error.message);
        throw new ForbiddenException(error.message || 'Session expired! Please sign in');
      }
          
    }
}