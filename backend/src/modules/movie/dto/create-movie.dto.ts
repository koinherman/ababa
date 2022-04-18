import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({
    example: 'Test Movie',
    description: 'The name of the movie',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'https://',
    description: 'The thumb image of the movie',
  })
  @IsNotEmpty()
  @IsUrl()
  readonly image: string;

  @ApiProperty({
    example: 'https://',
    description: 'The video url of the movie',
  })
  @IsNotEmpty()
  @IsUrl()
  readonly video: string;

  @ApiProperty({
    example: '',
    description: 'The description of the movie',
  })
  readonly description: string;
}
