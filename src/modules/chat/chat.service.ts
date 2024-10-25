import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { Customer } from '../customer/entities/customer.entity';
import { UserRole } from 'src/enums/userRoles.enum';
import { Request } from 'express';

@Injectable()
export class ChatService {


  constructor(@InjectRepository(Chat) private chatReposiroty:Repository <Chat>,
              @InjectRepository(Customer) private customerRepository:Repository<Customer>){}

  async createMessage(obj): Promise<any> {
    
    const {content,sender,recipient}=obj

    const message=this.chatReposiroty.create({content,sender,recipient})
    // const checkSender=await this.customerRepository.findOne({where:{id:sender}});
    
    // if(!checkSender) throw new NotFoundException("User not Found")

    // const messagedata=this.chatReposiroty.create({sender:sender,recipient:recipient})  
    return this.chatReposiroty.save(message)
  }


  // async getMessages(): Promise<Chat[]> {
  //   return this.chatReposiroty.find({ relations: ['sender'] });
  // }


  async getChatHistory(req:Request):Promise<any>{

    const admin = await this.customerRepository.findOne({where:{role:UserRole.ADMIN}})

    if (!admin) {
      throw new Error('Admin not found');
    }

    const {iat,exp,...others} =req["decodedData"]
    
    // Fetch chats between the current user and the admin
    return this.chatReposiroty.find({
      where: [
        { sender: { id: others.id }, recipient: { id: admin.id } },
        { sender: { id: admin.id }, recipient: { id: others.id } },
      ],
      select:{id:true,content:true,sender:{id:true,firstName:true,lastName:true},recipient:{id:true,firstName:true,lastName:true}},
      order: { createdAt: 'ASC' },
       // Order by creation date ascending
    });
  }


  async getUserChat(id:string,req:Request):Promise<any>
  {


    const {iat,exp,...others} =req["decodedData"]

    console.log(others)
    const checkUser=await this.customerRepository.findOne({where:{id}})
    if (!checkUser)  throw new NotFoundException(`User not found`);
    
    return this.chatReposiroty.find({
      where: [
        { sender: { id: others.id }, recipient: { id: checkUser.id } },
        { sender: { id: checkUser.id }, recipient: { id: others.id } },
      ],
      select:{id:true,content:true,sender:{id:true,firstName:true,lastName:true},recipient:{id:true,firstName:true,lastName:true}},
      order: { createdAt: 'ASC' }, // Order by creation date ascending
    });

  }
  }

  // create(createChatDto: CreateChatDto) {
  //   return 'This action adds a new chat';
  // }

  // findAll() {
  //   return `This action returns all chat`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} chat`;
  // }


  // remove(id: number) {
  //   return `This action removes a #${id} chat`;
  // }}
