import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({namespace:"/order"})
export class OrderGateway implements OnGatewayInit,OnGatewayConnection,OnGatewayDisconnect{

    private userSockets: Map<string, string> = new Map();
    constructor(){}
    @WebSocketServer() server: Server;


    afterInit(server: Server) {
        this.server = server;
      }    

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
      }
    
      handleDisconnect(@ConnectedSocket() client: Socket) {
        console.log(`Client disconnected: ${client.id}`);

        this.userSockets.forEach((socketId, userId) => {
          if (socketId === client.id) {
            this.userSockets.delete(userId);
          }
        });
      }

     // Method to register a user with their socket ID
  registerUser(userId: string, socketId: string) {
    this.userSockets.set(userId, socketId);
  }

      @SubscribeMessage('registerUser')
      handleRegisterUser(client: Socket, userId: string) {
        const cleanedUserId = userId.replace(/"/g, '').trim();
        this.registerUser(cleanedUserId, client.id);
        console.log(`User registered: ${userId} with socket ID: ${client.id}`);
      }
    

  sendOrderNotification(userId: string, message: string) {
   
   console.log(this.userSockets)
    const socketId = this.userSockets.get(userId);

   console.log(socketId) 
    if (socketId) {
      this.server.to(socketId).emit('orderNotification', { message });
    }
  }  

}

