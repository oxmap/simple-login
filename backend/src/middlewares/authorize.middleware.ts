import { NestMiddleware, Injectable, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService, private configService: ConfigService) {}

  async use(req: any, res: any, next: () => void) {
    const authHeaders = req.headers.authorization;

    if (authHeaders && (authHeaders as string).split(' ')[1]) {

      const token = (authHeaders as string).split(' ')[1];
      const decoded: any = jwt.verify(token, this.configService.get<string>('JWT_SECRET'));
      const user = await this.userService.getUserAuthenticated(decoded.email);
      if (user) { req.user = user; }
    } else {
      throw new HttpException({}, 401);
    }
    next();
  }
}
