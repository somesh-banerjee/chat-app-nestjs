import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from './interfaces/room.interface';
import { Message } from './interfaces/message.interface';

@Injectable()
export class RoomsService {
  constructor(@InjectModel('Room') private readonly roomModel: Model<Room>) {}

  async create(room: Room): Promise<Room> {
    const createdRoom = new this.roomModel(room);
    return await createdRoom.save();
  }

  async update(roomId: string, room: Room): Promise<Room> {
    return await this.roomModel.findByIdAndUpdate(roomId, room).exec();
  }

  async delete(roomId: string) {
    return await this.roomModel.findByIdAndDelete(roomId).exec();
  }

  async findById(roomId: string): Promise<Room> {
    return await this.roomModel.findById(roomId).exec();
  }

  async findOne(options?: any, fields?: any): Promise<Room | null> {
    return await this.roomModel.findOne(options, fields).exec();
  }

  async findAll(options?: any): Promise<Room[]> {
    return await this.roomModel.find(options).exec();
  }

  async addMessage(roomId: string, message: Message): Promise<Room> {
    const room = await this.roomModel.findById(roomId);
    room.messages.push(message);

    return await room.save();
  }

  async findWithLimit(roomId: string, limit: number): Promise<Room | null> {
    return await this.roomModel
      .findById(roomId)
      .slice('messages', limit)
      .exec();
  }

  async findMessages(roomId: string, limit: number): Promise<Message[]> {
    const room = await this.findWithLimit(roomId, limit);
    return room.messages;
  }
}
