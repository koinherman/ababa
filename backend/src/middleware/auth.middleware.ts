import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jsonwebtoken from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  async use(req: Request, res: Response, next: () => void) {
    let token = req.headers.authorization;

    if (!token) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    try {
      token = token.replace('Bearer ', '');

      const user = jsonwebtoken.verify(
        token,
        this.configService.get<string>('JWT_SECRET'),
      );

      req['user'] = user;

      next();
    } catch (e) {
      Logger.log(e);
      throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
