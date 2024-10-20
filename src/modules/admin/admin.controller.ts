import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseGuards, Query, Res } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { loginDto } from '../auth/dto/create-auth.dto';
import { ValidationsPipe } from 'src/pipes/customValidation.pipe';
import { LoginGuard } from '../auth/guards/login.guards';
import { AuthService } from '../auth/auth.service';
import { Response } from 'express';
import { ApiFeatures } from 'src/utils/features/apiFeatures';
import { CustomerService } from '../customer/customer.service';
import { AuthsGuard } from '../auth/guards/auth.guards';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/role.decorators';
import { UserRole } from 'src/enums/userRoles.enum';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService,private authService:AuthService,private customerService:CustomerService) {}

  @Post("login")
  @UsePipes(new ValidationsPipe)
  @UseGuards(LoginGuard)
  login(@Body() body:loginDto,request:any)
  {
    const user=request.data
    return this.authService.login(body,user);
  }

  @Get("getcustomers")
  @UseGuards(AuthsGuard,RolesGuard)
  @Roles(UserRole.ADMIN)
 async getCustomers(@Query() query:any, @Res() res:Response)
  { 
      const {customers,total}=await this.customerService.findAll(query)

      const limit=query.limit*1 || 5
      const page=query.page *1 || 1

      const features=new ApiFeatures(null,query);

      features.buildResponse(customers,total,page,limit,res)
  }

  // @Post()
  // create(@Body() createAdminDto: CreateAdminDto) {
  //   return this.adminService.create(createAdminDto);
  // }

  // @Get()
  // findAll() {
  //   return this.adminService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.adminService.findOne(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.adminService.remove(+id);
  // }
}
