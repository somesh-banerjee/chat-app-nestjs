import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Request() req): Promise<User> {
    const id = req.params.id;
    if (!id)
      throw new HttpException('Missing id parameter', HttpStatus.BAD_REQUEST);

    const user = await this.userService.findById(id);
    if (!user)
      throw new HttpException(`User ${id} not found`, HttpStatus.NOT_FOUND);

    return user;
  }

  @Post()
  async create(@Body() body) {
    if (!body.email || !body.password || !body.username || !body.name)
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);

    await this.userService.create(body);
  }

  @Put(':id')
  async update(@Request() req) {
    const id = req.params.id;
    if (!id)
      throw new HttpException('Missing id parameter', HttpStatus.BAD_REQUEST);

    await this.userService.update(id, req.body);
  }

  @Delete(':id')
  async delete(@Request() req) {
    const id = req.params.id;
    if (!id)
      throw new HttpException('Missing id parameter', HttpStatus.BAD_REQUEST);

    await this.userService.delete(id);
  }
}
