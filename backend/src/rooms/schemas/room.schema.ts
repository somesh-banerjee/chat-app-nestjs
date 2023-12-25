import { Schema } from 'mongoose';

const room = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

room.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

export { room as RoomSchema };
