import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Roles } from 'src/common/decorators/role.decorators';
import { UserRole } from 'src/enums/userRoles.enum';
import { AuthsGuard } from '../auth/guards/auth.guards';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('customer')
@UseGuards(AuthsGuard,RolesGuard)
export class CustomerController {
  constructor(private  customerService: CustomerService) {}

  @Get("me")
  @Roles(UserRole.USER)
  getProfile(@Req() req:Request)
  {
        return this.customerService.profile(req)
  }
  // @Post()
  // create(@Body() createCustomerDto: CreateCustomerDto) {
  //   return this.customerService.create(createCustomerDto);
  // }

 

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.customerService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
  //   return this.customerService.update(+id, updateCustomerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.customerService.remove(+id);
  // }
}
