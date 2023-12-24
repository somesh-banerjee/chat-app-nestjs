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
import { RoomsService } from './rooms.service';
import { Room } from './interfaces/room.interface';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  async index(): Promise<Room[]> {
    return await this.roomsService.findAll();
  }

  @Get(':id')
  async show(@Request() req): Promise<Room> {
    const { id } = req.params;
    if (!id)
      throw new HttpException('Room ID is required', HttpStatus.BAD_REQUEST);

    const room = await this.roomsService.findById(id);
    if (!room) throw new HttpException('Room not found', HttpStatus.NOT_FOUND);

    return room;
  }

  @Post()
  async create(@Body() body: Room): Promise<Room> {
    if (!body || !body.name)
      throw new HttpException('Room data is required', HttpStatus.BAD_REQUEST);

    const room = await this.roomsService.create(body);
    return room;
  }

  @Put(':id')
  async update(@Request() req): Promise<Room> {
    const { id } = req.params;
    if (!id)
      throw new HttpException('Room ID is required', HttpStatus.BAD_REQUEST);

    const room = await this.roomsService.update(id, req.body);
    if (!room) throw new HttpException('Room not found', HttpStatus.NOT_FOUND);

    return room;
  }

  @Delete(':id')
  async delete(@Request() req) {
    const { id } = req.params;
    if (!id)
      throw new HttpException('Room ID is required', HttpStatus.BAD_REQUEST);

    const room = await this.roomsService.delete(id);
    if (!room) throw new HttpException('Room not found', HttpStatus.NOT_FOUND);

    return room;
  }
}
