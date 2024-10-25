import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, UseGuards, UsePipes } from '@nestjs/common';
import { RestuarentService } from './restuarent.service';
import { CreateRestuarentDto } from './dto/create-restuarent.dto';
// import { AuthsGuard } from '../auth/guards/auth.guards';
import { ValidationsPipe } from 'src/pipes/customValidation.pipe';
import { AuthsGuard } from '../auth/guards/auth.guards';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/role.decorators';
import { UserRole } from 'src/enums/userRoles.enum';

@Controller('restuarent')

export class RestuarentController {
  constructor(private readonly restuarentService: RestuarentService) {}

  @Post("create")
  // @UseGuards(AuthsGuard)
  @UsePipes(new ValidationsPipe)
  create(@Body() createRestuarentDto: CreateRestuarentDto) {
    return this.restuarentService.create(createRestuarentDto);
  }

  @Get("getrestuarents")
  @UseGuards(AuthsGuard)
 async get(@Query() query:any)
  {


    // const {customers,total}=await this.restuarentService.findAll(query)

    // const limit=query.limit*1 || 5
    // const page=query.page *1 || 1

    // const features=new ApiFeatures(null,query);

    // features.buildResponse(customers,total,page,limit,res)

    return this.restuarentService.getRestuarents(query);
  }

  @Get("getonerestuarent/:id")
  getoneRestuarent(@Param("id") id:string)
  {
    return this.restuarentService.getOneRestuarent(id)
  }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRestuarentDto: UpdateRestuarentDto) {
  //   return this.restuarentService.update(+id, updateRestuarentDto);
  // }

}
