import { Schema } from 'mongoose';

const message = new Schema({
  message: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
});

export { message as MessageSchema };
