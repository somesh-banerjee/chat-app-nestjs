import { Document, Schema } from 'mongoose';
import { Message } from './message.interface';

export interface Room extends Document {
  name: string;
  description?: string;
  messages?: Message[];
  created_at: Date;
  updated_at: Date;
}
