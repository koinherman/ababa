import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ListMovieDto {
  @ApiProperty({
    example: '',
    description: 'The search string for list movies',
    required: false,
  })
  readonly search?: string;

  @ApiProperty({
    example: '0',
    description: 'The skip offset for list movies',
  })
  @IsNotEmpty()
  readonly skip: string;

  @ApiProperty({
    example: '100',
    description: 'The limit count for list movies',
  })
  @IsNotEmpty()
  readonly limit: string;
}
