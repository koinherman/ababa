import { useDispatch } from "react-redux"
import { createMovie, updateMovie, deleteMovie } from "../redux/slices/movie"
import { IMovie, IMovieUpdate, IMovieDelete } from "../interfaces"

export default function useMovie() {
    const dispatch = useDispatch()

    return {
        createMovie: (movieArgs: IMovie) =>
            dispatch(
                createMovie({
                    name: movieArgs.name,
                    video: movieArgs.video,
                    image: movieArgs.image,
                    description: movieArgs.description
                })
            ),

        updateMovie: (movieArgs: IMovieUpdate) =>
            dispatch(
                updateMovie({
                    id: movieArgs.id,
                    name: movieArgs.name,
                    image: movieArgs.image,
                    video: movieArgs.video,
                    description: movieArgs.description
                })
            ),

        deleteMovie: (movieArgs: IMovieDelete) =>
            dispatch(
                deleteMovie({
                    movie_id: movieArgs.movie_id
                })
            )
    }
}
