import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomSchema } from './schemas/room.schema';
import { MessageSchema } from './schemas/message.schema';
import { UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Room', schema: RoomSchema },
      { name: 'Message', schema: MessageSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
