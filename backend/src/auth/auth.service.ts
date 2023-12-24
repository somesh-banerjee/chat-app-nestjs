import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from './jwt/jwt.service';
import { User } from 'src/user/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Verifies a user's credentials
   * @param signedUser
   * @returns {boolean} isValid - True if the user's credentials are valid
   */
  private async checkUserPassword(
    signedUser: User,
    password: string,
  ): Promise<boolean> {
    if (signedUser.password === password) return true;
    return false;
  }

  /**
   * Signs a user in
   * @param credentials
   * @returns {Promise} tokens - The access and refresh tokens
   */
  async signIn(credentials: any): Promise<any> {
    const user = await this.userService.findOne({ email: credentials.email });
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    const isValid = await this.checkUserPassword(user, credentials.password);
    if (!isValid)
      return new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    const serializedUser = user.schema.methods.serialize(user);
    const tokens = await this.jwtService.generateTokens(serializedUser);

    return { user: serializedUser, tokens };
  }

  /**
   * Refreshes a user's access token
   * @param token
   * @returns {Promise} tokens - The access and refresh tokens
   */
  async refreshToken(token: string): Promise<any> {
    const user = await this.jwtService.verify(token);
    const tokens = await this.jwtService.generateTokens(user);

    return { tokens, user };
  }

  /**
   * Registers a new user
   * @param user
   * @returns {Promise} tokens - The access and refresh tokens
   */
  async register(user: User): Promise<any> {
    const newUser = await this.userService.create(user);
    const serializedUser = newUser.schema.methods.serialize(newUser);
    const tokens = await this.jwtService.generateTokens(serializedUser);

    return { user: serializedUser, tokens };
  }
}
