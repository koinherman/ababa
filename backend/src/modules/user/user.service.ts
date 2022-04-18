import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jsonwebtoken from 'jsonwebtoken';
import { User } from './user.schema';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { IUser } from './user.types';
import { BadRequestException } from 'src/common/badrequest-exception';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) protected readonly user: Model<User>) {}

  // find existing user by email
  async findUser(email: string, withPassword = true): Promise<IUser | null> {
    try {
      const user = await this.user.findOne({ email }).exec();

      return user
        ? {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            ...(withPassword && { password: user.password }),
          }
        : null;
    } catch (e) {
      Logger.log(e);
      throw new BadRequestException(e.message || 'Something went wrong');
    }
  }

  // create user with registeration details
  async createUser(registerUserDto: RegisterUserDto): Promise<IUser> {
    try {
      const userInfo = {
        ...registerUserDto,
        password: await bcrypt.hash(registerUserDto.password, 10),
      };
      const user = new this.user(userInfo);

      await user.save();

      return {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };
    } catch (e) {
      Logger.log(e);
      throw new BadRequestException(e.message || 'Something went wrong');
    }
  }

  // generate jwt token with user infos
  async generateToken(email: string, secret: string): Promise<string> {
    try {
      const user = await this.findUser(email);

      const token: string = jsonwebtoken.sign(
        {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        secret,
        { expiresIn: '1y' },
      );

      return token;
    } catch (e) {
      Logger.log(e);
      throw new BadRequestException(e.message || 'Something went wrong');
    }
  }

  async signInUser(loginUserDto: LoginUserDto): Promise<boolean> {
    try {
      const user = await this.findUser(loginUserDto.email);

      const valid = await bcrypt.compare(loginUserDto.password, user.password);

      return valid;
    } catch (e) {
      Logger.log(e);
      throw new BadRequestException(e.message || 'Something went wrong');
    }
  }
}
