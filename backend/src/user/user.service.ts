import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(options?: any): Promise<User[]> {
    const users = await this.userModel.find(options).exec();
    const serializedUsers = users.map((user) => {
      return user.schema.methods.serialize(user);
    });

    return serializedUsers;
  }

  async findById(id: number): Promise<any> {
    let user = await this.userModel.findById(id).exec();

    if (user) user = user.schema.methods.serialize(user);

    return user;
  }

  async findOne(options?: any, isSerial?: boolean): Promise<any> {
    let user = await this.userModel.findOne(options).exec();

    if (user && isSerial) user = user.schema.methods.serialize(user);

    return user;
  }

  async create(user: User): Promise<any> {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async update(id: number, user: User): Promise<any> {
    return await this.userModel.findByIdAndUpdate(id, user).exec();
  }

  async delete(id: number): Promise<any> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
