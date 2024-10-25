import { UnauthorizedException, UseGuards } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { WsJWTGuard } from "../auth/guards/chatAuth.guard";
import { CreateChatDto } from "./dto/create-chat.dto";
import { CustomerService } from "../customer/customer.service";
import { ChatService } from "./chat.service";
import { Chat } from "./entities/chat.entity";
import { JwtService } from "@nestjs/jwt";

@WebSocketGateway()
// @UseGuards(WsJWTGuard)
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private adminClients: Map<string, Socket> = new Map();
  private userClients: Map<string, Socket> = new Map();
  constructor(
    private readonly jwtService:JwtService,
    private readonly chat:ChatService,
    private readonly customer:CustomerService){}
    @WebSocketServer() server: Server;



    afterInit(server: Server) {
      this.server = server;
    }


      async handleConnection(@ConnectedSocket() client: Socket) {

        const authToken = client.handshake.headers.authorization;
       
        if(!authToken) throw new UnauthorizedException("UnAuthorized Access")
        
        const payload = this.jwtService.verify(authToken);  
       
        const role = payload.role;

        if (role === 'admin') {
          client["user"]=payload
          this.adminClients.set(client.id, client);
          console.log(`Admin connected: ${client.id}`);
        } else if (role === 'user') {
          client["user"]=payload
          this.userClients.set(client.id, client);
          console.log(`User connected: ${client.id}`);
        }
      }

      handleDisconnect(@ConnectedSocket() client: Socket) {
        if (this.adminClients.has(client.id)) {
          this.adminClients.delete(client.id);
          console.log(`Admin disconnected: ${client.id}`);
        } else if (this.userClients.has(client.id)) {
          this.userClients.delete(client.id);
          console.log(`User disconnected: ${client.id}`);
        }
      }


      // @SubscribeMessage('sendMessage')
      // async handleSendMessage(client: Socket, payload: Chat): Promise<void> {
      //   this.server.emit('recMessage', payload);
      // }
      
  @UseGuards(WsJWTGuard)
  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() message:string,
    @ConnectedSocket() client: Socket
  ) {
    const sender = client["user"];
    
    if (sender.role === 'user') {
      // Pick the first admin available to receive the message (you can improve this with custom logic)
      const adminSocket = Array.from(this.adminClients.values())[0];

      if (adminSocket) {
        const admin = adminSocket["user"] 
        const sendmessage = await this.chat.createMessage({content:message,sender:sender["id"],recipient:admin["id"]});
        
        // Send the message to the admin
        adminSocket.emit('receiveMessage', sendmessage);

      
        client.emit('messageSent', sendmessage);
      }
    } else {
   
      console.log('Admin is sending a message...');
    }
  }


   // Handling admin sending messages back to the user
   @UseGuards(WsJWTGuard)
   @SubscribeMessage('adminSendMessage')
   async handleAdminSendMessage(
     @MessageBody() data:any,
     @ConnectedSocket() client: Socket
   ) {

      const sender=client["user"]
      const obj=JSON.parse(data)

     const admin = sender.role;
     const user = await this.customer.getUserRole(obj["id"]);
 
     if (admin !== 'admin') {
       throw new UnauthorizedException("Only Admin can send messages to the user")
     }
 
     if (!user) {
       throw new Error('User not found');
     }
 
     const message = await this.chat.createMessage({ content:obj["content"], sender:sender.id, recipient:obj["id"]});
   
     const userSocket = Array.from(this.userClients.values()).find(socket => socket["user"]["id"] === obj["id"]);
 
     if (userSocket) {
        userSocket.emit('receiveMessage', message);
     }
    
    
      client.emit('messageSent', message);
   }

      // @UseGuards(WsJWTGuard)
    //   @SubscribeMessage('message')
    // async handleMessage(@MessageBody() message: CreateChatDto,@ConnectedSocket() client:Socket) {
        
    //     const user=client["user"]

    //     console.log('Message received:', user);

    //     const getuser=this.customer.findOneByEmail(user.email);

    //     const messageData = {
    //       content: message.content,
    //       senderId: getuser['id'],
    //       recipientId: null, 
    //     };

        
    //     // const sendmessage = await this.chat.createMessage(messageData);


    //     this.server.emit('message',message);
    //   }

      // sendMessageToUser(userId: string, messageContent: string) {
      //   this.server.to(userId).emit('receiveMessage', {
      //     userId,
      //     content: messageContent,
      //   });
      // }
}
