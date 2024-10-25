import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Request } from 'express';
import { AuthsGuard } from '../auth/guards/auth.guards';
import { Roles } from 'src/common/decorators/role.decorators';
import { UserRole } from 'src/enums/userRoles.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // @Post()
  // create(@Body() createChatDto: CreateChatDto) {
  //   return this.chatService.create(createChatDto);
  // }

  @Get("/mychat")
  @UseGuards(AuthsGuard,RolesGuard)
  @Roles(UserRole.USER)
  getMessage(@Req() req:Request) {
    return this.chatService.getChatHistory(req);
  }

  @Get("/userchat/:id")
  @UseGuards(AuthsGuard,RolesGuard)
  @Roles(UserRole.ADMIN)
  getUserChat(@Param("id") id:string,@Req() req:Request)
  {
    return this.chatService.getUserChat(id,req)
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.chatService.findOne(+id);
  // }


  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.chatService.remove(+id);
  // }
}
