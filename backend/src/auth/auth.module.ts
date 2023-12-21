import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';

import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';
import { JwtService } from './jwt/jwt.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [JwtService],
})
export class AuthModule {}
