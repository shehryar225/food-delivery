import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Customer } from '../customer/entities/customer.entity';
import { AuthModule } from '../auth/auth.module';
import { CustomerModule } from '../customer/customer.module';
import { JwtStrategy } from 'src/strategies/jwt.strategy';

@Module({
  imports:[TypeOrmModule.forFeature([Chat,Customer]),
  AuthModule,
  CustomerModule
],
  controllers: [ChatController],
  providers: [ChatService,ChatGateway,JwtStrategy],
  exports:[ChatService]
})
export class ChatModule {}
