import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    example: 'test@test.com',
    description: 'The email of the User',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: '',
    description: 'The pasword of the User',
  })
  @MinLength(4)
  @MaxLength(16)
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
