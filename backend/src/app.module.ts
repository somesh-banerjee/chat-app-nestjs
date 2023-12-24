import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CONFIG } from './config';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [
    MongooseModule.forRoot(CONFIG.databaseURL),
    AuthModule,
    UserModule,
    ChatModule,
    RoomsModule,
  ],
})
export class AppModule {}
