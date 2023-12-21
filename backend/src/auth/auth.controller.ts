import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Request() req): Promise<any> {
    const body = req.body;
    if (!body || !body.email || !body.password)
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);

    return await this.authService.signIn(body);
  }

  @Post('refresh-token')
  async refreshToken(@Request() req): Promise<any> {
    const body = req.body;
    if (!body || !body.token)
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);

    return await this.authService.refreshToken(body.token);
  }

  @Post('register')
  async register(@Request() req): Promise<any> {
    const body = req.body;
    if (!body || !body.email || !body.password || !body.username || !body.name)
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);

    return await this.authService.register(body);
  }
}
