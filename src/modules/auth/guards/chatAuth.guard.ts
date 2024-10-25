import { CanActivate, ExecutionContext, ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Socket } from "socket.io";
import { CustomerService } from "src/modules/customer/customer.service";


@Injectable()
export class WsJWTGuard implements CanActivate{

    constructor(private readonly jwtService:JwtService,private readonly customer:CustomerService){}

   async canActivate(context: ExecutionContext): Promise<boolean> {
        

        try
        {
            const client: Socket = context.switchToWs().getClient<Socket>();
            const authToken = client.handshake.headers.authorization;
    
            if(!authToken) throw new UnauthorizedException("UnAuthorized Access")
    
            const payload = this.jwtService.verify(authToken);
            

            const getUser=await this.customer.findOneByEmail(payload.email);

            if(!getUser) throw new UnauthorizedException("Unauthorized Access");

            if (getUser?.passwordUpdatedAt > new Date(payload?.iat * 1000)) throw new UnauthorizedException('Token is no longer valid. Please log in again.');

            client["user"] = payload;
            return true
        }
        catch(error)
        {
            console.log('AuthGuard Error:', error.message);
            throw new HttpException(error.message, HttpStatus.FORBIDDEN);
            // throw new ForbiddenException(error.message || 'Session expired! Please sign in');
        }

    }
}