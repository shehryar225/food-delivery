import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

import { Customer } from '../customer/entities/customer.entity';
import { CustomerService } from '../customer/customer.service';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterGuard } from './guards/register.guards';
import { LoginGuard } from './guards/login.guards';
import {  AuthsGuard } from './guards/auth.guards';
import { WsJWTGuard } from './guards/chatAuth.guard';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
console.log("JWT Token",configService.get('JWT_SECRET_KEY'))

@Module({
  imports: [
    JwtModule.register({
      secret: "asdsadasdasdasassadfsdfsdfsdf", 
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([Customer]),
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,CustomerService,RegisterGuard,LoginGuard,AuthsGuard,WsJWTGuard],
  exports:[AuthService,JwtModule,AuthsGuard,WsJWTGuard]
})
export class AuthModule {}
