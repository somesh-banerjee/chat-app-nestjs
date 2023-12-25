import { Document, Schema } from 'mongoose';
import { User } from 'src/user/interfaces/user.interface';

export interface Message extends Document {
  message: string;
  user: User;
  date: Date;
}
