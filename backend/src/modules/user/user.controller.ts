import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiSecurity, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('User')
@Controller('api/user')
export class UserController {
  constructor(
    protected readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({
    summary: 'Register new user',
  })
  @Post('register')
  async register(@Res() res, @Body() registerUserDto: RegisterUserDto) {
    // check same email user already exists
    let user = await this.userService.findUser(registerUserDto.email, false);
    if (user) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Same user already exists' });
    }

    // create user
    user = await this.userService.createUser(registerUserDto);

    // generate jwt token after creating user successfully
    const token = await this.userService.generateToken(
      user.email,
      this.configService.get<string>('JWT_SECRET'),
    );

    return res.status(HttpStatus.CREATED).json({
      success: true,
      token,
    });
  }

  @ApiOperation({
    summary: 'Login user with email and password',
  })
  @Post('login')
  async login(@Res() res, @Body() loginUserDto: LoginUserDto) {
    // check same email user already exists
    const user = await this.userService.findUser(loginUserDto.email, false);
    if (!user) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Email or password incorrect' });
    }

    // sign in with email and password
    const signInResult = await this.userService.signInUser(loginUserDto);
    if (!signInResult) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Email or password incorrect' });
    }

    // generate jwt token after creating user successfully
    const token = await this.userService.generateToken(
      user.email,
      this.configService.get<string>('JWT_SECRET'),
    );

    return res.status(HttpStatus.CREATED).json({
      success: true,
      token,
    });
  }

  @ApiSecurity('bearer')
  @ApiOperation({
    summary: 'Get current logged in user info',
  })
  @Get('me')
  async getMe(@Req() req, @Res() res) {
    const reqUser = req.user;

    // find user based on user email
    const user = await this.userService.findUser(reqUser.email, false);

    return res.status(HttpStatus.OK).json(user);
  }
}
