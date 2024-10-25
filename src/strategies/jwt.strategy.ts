import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from "src/interfaces/jwtPayload.interface";
import { CustomerService } from "src/modules/customer/customer.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {


    constructor(private custservices:CustomerService ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "asdsadasdasdasassadfsdfsdfsdf", // Use your secret from config
        });
        
    }

    async validate(payload:any) {
        const user = await this.custservices.findById(payload.id); 
        if (!user) {
            throw new UnauthorizedException(); 
        }
        return user;
    }


}