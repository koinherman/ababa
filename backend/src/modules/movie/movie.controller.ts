import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { ApiSecurity, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ListMovieDto } from './dto/list-movies.dto';

@ApiTags('Movie')
@Controller('api/movie')
export class MovieController {
  constructor(protected readonly movieService: MovieService) {}

  @ApiSecurity('bearer')
  @ApiOperation({
    summary: 'Create new movie',
  })
  @Post()
  async createMovie(
    @Req() req,
    @Res() res,
    @Body() createMovieDto: CreateMovieDto,
  ) {
    const reqUser = req.user;

    const movie = await this.movieService.createMovie(reqUser, createMovieDto);

    return res.status(HttpStatus.CREATED).json(movie);
  }

  @ApiSecurity('bearer')
  @ApiOperation({
    summary: 'Update movie infos',
  })
  @Post(':id')
  async updateMovie(
    @Param('id') id: string,
    @Res() res,
    @Body() createMovieDto: CreateMovieDto,
  ) {
    const movie = await this.movieService.updateMovie(id, createMovieDto);

    return res.status(HttpStatus.OK).json(movie);
  }

  @ApiSecurity('bearer')
  @ApiOperation({
    summary: 'Get single movie info',
  })
  @Get(':id')
  async getMovie(@Param('id') id: string, @Res() res) {
    const movie = await this.movieService.getMovie(id);

    return res.status(HttpStatus.OK).json(movie);
  }

  @ApiSecurity('bearer')
  @ApiOperation({
    summary: 'Get movies by offset and limit',
  })
  @Get()
  async getMovies(@Req() req, @Query() query: ListMovieDto, @Res() res) {
    const reqUser = req.user;

    const movies = await this.movieService.getMovies(reqUser, query);

    return res.status(HttpStatus.OK).json(movies);
  }

  @ApiSecurity('bearer')
  @ApiOperation({
    summary: 'Delete movie',
  })
  @Delete(':id')
  async deleteMovie(@Param('id') id: string, @Res() res) {
    const movie = await this.movieService.deleteMovie(id);

    return res.status(HttpStatus.OK).json(movie);
  }
}
