import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { Movie } from './movie.schema';
import { IMovie } from './movie.types';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ListMovieDto } from './dto/list-movies.dto';
import { BadRequestException } from 'src/common/badrequest-exception';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) protected readonly movie: Model<Movie>,
  ) {}

  async createMovie({ id }, createMovieDto: CreateMovieDto): Promise<IMovie> {
    try {
      const { name, image, video, description } = createMovieDto;

      const movie = new this.movie({
        name,
        image,
        video,
        description: description || '',
        user: id,
      });

      await movie.save();

      return {
        id: movie._id,
        name: movie.name,
        image: movie.image,
        video: movie.video,
        description: movie.description,
      };
    } catch (e) {
      Logger.log(e);
      throw new BadRequestException(e.message || 'Something went wrong');
    }
  }

  async updateMovie(
    id: string,
    createMovieDto: CreateMovieDto,
  ): Promise<IMovie> {
    try {
      const movie = await this.movie.findByIdAndUpdate(id, {
        ...createMovieDto,
      });

      return {
        id: movie._id,
        name: movie.name,
        image: movie.image,
        video: movie.video,
        description: movie.description,
      };
    } catch (e) {
      Logger.log(e);
      throw new BadRequestException(e.message || 'Something went wrong');
    }
  }

  async getMovie(id: string): Promise<IMovie> {
    try {
      const movie = await this.movie.findById(id);

      return {
        id: movie._id,
        name: movie.name,
        image: movie.image,
        video: movie.video,
        description: movie.description,
      };
    } catch (e) {
      Logger.log(e);
      throw new BadRequestException(e.message || 'Something went wrong');
    }
  }

  async getMovies(
    { id },
    listMovieDto: ListMovieDto,
  ): Promise<{ movies: Array<IMovie>; total: number }> {
    try {
      const search = listMovieDto.search || '';

      const query = {
        $and: [
          {
            user: id,
          },
          {
            $or: [
              { name: { $regex: search, $options: 'i' } },
              { description: { $regex: search, $options: 'i' } },
            ],
          },
        ],
      };

      const movies = await this.movie
        .find(query)
        .sort({ _id: 1 })
        .skip(+listMovieDto.skip)
        .limit(+listMovieDto.limit);

      const total = (await this.movie.find(query)).length;

      return {
        movies: movies.map((movie) => {
          return {
            id: movie._id,
            name: movie.name,
            image: movie.image,
            video: movie.video,
            description: movie.description,
          };
        }),
        total,
      };
    } catch (e) {
      Logger.log(e);
      throw new BadRequestException(e.message || 'Something went wrong');
    }
  }

  async deleteMovie(id: string): Promise<IMovie> {
    try {
      const movie = await this.movie.findByIdAndDelete(id);

      return {
        id: movie._id,
        name: movie.name,
        image: movie.image,
        video: movie.video,
        description: movie.description,
      };
    } catch (e) {
      Logger.log(e);
      throw new BadRequestException(e.message || 'Something went wrong');
    }
  }
}
