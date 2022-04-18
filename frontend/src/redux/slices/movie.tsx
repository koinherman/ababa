import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { IMovie, IMovieUpdate, IMovieDelete } from "../../interfaces"

const initialState = {
    isLoading: false,
    error: false,
    movies: [],
    total: 0,
    hasMore: true
}

const pageSize = 12

const slice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        // START LOADING
        startLoading(state) {
            state.isLoading = true
        },

        // HAS ERROR
        hasError(state, action) {
            state.isLoading = false
            state.error = action.payload
        },

        // GET Movies Success
        getMoviesSuccess(state, action) {
            state.isLoading = false
            const page = action.payload.page
            page > 0
                ? (state.movies = state.movies.concat(action.payload.movies))
                : (state.movies = action.payload.movies)
            state.total = action.payload.total
            if (action.payload.movies.length < pageSize) state.hasMore = false
            else state.hasMore = true
        }
    }
})

// Reducer
export default slice.reducer

// ----------------------------------------------------------------------

export function getMovies(page: number, search = '') {
    return async (dispatch: any) => {
        try {
            dispatch(slice.actions.startLoading())
            const token = localStorage.getItem("jwtToken")
            const skip = +page * +pageSize

            const res = await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}/movie`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    search,
                    skip,
                    limit: pageSize,
                }
            })

            const movies = res.data.movies
            const total = res.data.total

            dispatch(
                slice.actions.getMoviesSuccess({
                    movies,
                    total,
                    page,
                })
            )
        } catch (error) {
            dispatch(slice.actions.hasError((error as Error).message))
        }
    }
}

export function createMovie(movieArgs: IMovie) {
    return async () => {
        try {
            const token = localStorage.getItem("jwtToken")
            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}/movie`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: movieArgs,
            })

            return true
        } catch (error) {
            throw error
        }
    }
}

export function updateMovie(movieArgs: IMovieUpdate) {
    return async () => {
        try {
            const token = localStorage.getItem("jwtToken")
            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}/movie/${movieArgs.id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: movieArgs,
            })

            return true
        } catch (error) {
            throw error
        }
    }
}

export function deleteMovie(movieArgs: IMovieDelete) {
    return async () => {
        try {
            const token = localStorage.getItem("jwtToken")
            await axios({
                method: "delete",
                url: `${process.env.REACT_APP_API_URL}/movie/${movieArgs.movie_id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: movieArgs,
            })

            return true
        } catch (error) {
            throw error
        }
    }
}
