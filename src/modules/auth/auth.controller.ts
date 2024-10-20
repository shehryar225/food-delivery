import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmailDTO, loginDto, registrationDto, restPasswordDto } from './dto/create-auth.dto';
import { Request } from 'express';
import { RegisterGuard } from './guards/register.guards';
import { ValidationsPipe } from 'src/pipes/customValidation.pipe';
import { LoginGuard } from './guards/login.guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  @UseGuards(RegisterGuard)
  @UsePipes(new ValidationsPipe)
  create(@Body() createAuthDto: registrationDto) {
    return this.authService.registration(createAuthDto);
  }

  @Get("verifycustomeremail")
  verifyEmail(@Query() query:Record<string,any>)
  {

    return this.authService.verifyAccount(query)
  
  }

  @Post("login")
  @UsePipes(new ValidationsPipe)
  @UseGuards(LoginGuard)
  login(@Body() body,@Req() request:any)
  {
    const user=request.data
    return this.authService.login(body,user);
  }


  @Post("resendemail")
  @UsePipes(new ValidationsPipe)
  async resendEmail(@Body() body:registrationDto)
  {
      return this.authService.resedEmail(body.email)
  }
  
  @Post("/forgetpassword")
  @UsePipes(new ValidationsPipe)
  async forgetPassword(@Body() body:EmailDTO)
  {
      return this.authService.resentPasswordRequest(body.email)
  }

  @Post("/verifyresendpassword/:token")
  @UsePipes(new ValidationsPipe)
  async verifyResetPassword(@Param() param:Record<string,any>,@Body() body:restPasswordDto)
  {
      return this.authService.verifyResetEmail(param,body)
  }
  
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
