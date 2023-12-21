import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as os from 'os';
import * as jwt from 'jsonwebtoken';

import { CONFIG } from 'src/config';
import { User } from 'src/user/interfaces/user.interface';
import { UserService } from 'src/user/user.service';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class JwtService {
  constructor(private readonly userService: UserService) {}

  /**
   * Generate a new JWT token for a user
   * @param {User} user - The user to generate the token for
   * @returns {Promise} - The access and refresh tokens
   */
  async generateTokens(user: User): Promise<any> {
    const payload = {
      sub: {
        _id: user._id,
        email: user.email,
        username: user.username,
      },
      iss: os.hostname(),
    };

    const accessToken = jwt.sign(payload, CONFIG.jwtSecret, {
      expiresIn: CONFIG.jwtAccessExpiration,
    });
    const refreshToken = jwt.sign(payload, CONFIG.jwtSecret, {
      expiresIn: CONFIG.jwtRefreshExpiration,
    });

    return { accessToken, refreshToken };
  }

  /**
   * Verify a JWT token
   * @param {string} token - The token to verify
   * @param {boolean} isWs - True to handle socket exceptions instead of HTTP exceptions
   */
  async verify(token: string, isWs?: boolean): Promise<any> {
    try {
      const payload = <any>jwt.verify(token, CONFIG.jwtSecret);
      const user = await this.userService.findById(payload.sub._id);

      if (!user) {
        if (isWs) throw new WsException('Unauthorized access');
        throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
      }

      return user;
    } catch (err) {
      if (isWs) throw new WsException(err.message);
      else throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
