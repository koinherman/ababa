import React, { useState, useMemo, useEffect, useCallback, ReactElement } from "react"
import { useDispatch, useSelector } from "react-redux"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import InfinitScroll from "react-infinite-scroll-component"
import Grid from "@material-ui/core/Grid"
import ModalVideo from 'react-modal-video'
import 'react-modal-video/scss/modal-video.scss'
import MovieDialog from "../../../components/MovieDialog"
import DeleteDialog from "../../../components/DeleteDialog"
import MovieCard from "../../../components/MovieCard"
import { getMovies } from "../../../redux/slices/movie"
import { IRootState } from "../../../redux/store"
import { IMovieUpdate } from "../../../interfaces"

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2)
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6, 0, 0)
    },
    addNewButton: {
        backgroundColor: "#3f51b5",
        color: "#ffffff",
        height: "40px"
    },
    heroButtons: {
        marginTop: theme.spacing(4)
    },
    cardGrid: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(8)
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    cardMedia: {
        paddingTop: "56.25%" // 16:9
    },
    cardContent: {
        flexGrow: 1
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6)
    },
    deleteIcon: {
        marginLeft: "auto!important",
        marginRight: 0
    },
    actionTopView: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }
}))

function HomeView(): ReactElement {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { movies, total, hasMore } = useSelector((state: IRootState) => state.movie)

    const [page, setPage] = useState(0)
    const [isFetch, setIsFetch] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [movieIndex, setMovieIndex] = useState(0)
    const [movieId, setMovieId] = useState("")
    const [isModalVideoOpen, setIsModalVideoOpen] = useState(false)
    const [videoUrl, setVideoUrl] = useState("")

    const getMovieDatas = useCallback(() => {
        if (isFetch) {
            dispatch(getMovies(page))
            setIsFetch(false)
        }
    }, [dispatch, isFetch, page])

    useEffect(() => {
        // Get registerd movie datas
        getMovieDatas()
    }, [getMovieDatas, dispatch, isFetch])

    const handleAddNewMovie = useCallback(() => {
        setIsOpen(true)
        setIsEdit(false)
    }, [])

    const onSaveNewMovie = useCallback(() => {
        setIsOpen(false)
        setPage(0)
        setIsFetch(true)
    }, [])

    const onUpdateMovie = useCallback(() => {
        setIsOpen(false)
        setPage(0)
        setIsFetch(true)
    }, [])

    const onCloseMovieDialog = useCallback(() => {
        setIsOpen(false)
    }, [])

    const showMovieDialog = useMemo(() => {
        return !isEdit ? (
            <MovieDialog
                isOpen={isOpen}
                isEdit={isEdit}
                onSaveNewMovie={onSaveNewMovie}
                onUpdateMovie={onUpdateMovie}
                onCloseMovieDialog={onCloseMovieDialog}
            />
        ) : (
            <MovieDialog
                isOpen={isOpen}
                isEdit={isEdit}
                id={(movies[movieIndex] as IMovieUpdate).id}
                name={(movies[movieIndex] as IMovieUpdate).name}
                image={(movies[movieIndex] as IMovieUpdate).image}
                video={(movies[movieIndex] as IMovieUpdate).video}
                description={(movies[movieIndex] as IMovieUpdate).description}
                onSaveNewMovie={onSaveNewMovie}
                onUpdateMovie={onUpdateMovie}
                onCloseMovieDialog={onCloseMovieDialog}
            />
        )
    }, [isOpen, isEdit])

    const handleNextPage = useCallback(() => {
        setPage(page + 1)
        setIsFetch(true)
    }, [])

    const onEditMovie = useCallback((movieIndex: number) => {
        setMovieIndex(movieIndex)
        setIsEdit(true)
        setIsOpen(true)
    }, [])

    const onDeleteMovie = useCallback(
        (movieIndex: number) => {
            setMovieId((movies[movieIndex] as IMovieUpdate).id)
            setIsDeleteOpen(true)
        },
        [movies]
    )

    const onCloseDeleteDialog = useCallback(() => {
        setIsDeleteOpen(false)
    }, [])

    const onDeleteSuccess = useCallback(() => {
        setIsDeleteOpen(false)
        setPage(0)
        setIsFetch(true)
    }, [])

    const onVideoPlay = useCallback((video: string) => {
        setIsModalVideoOpen(true)
        setVideoUrl(video)
    }, []);

    const showDeleteDialog = useMemo(() => {
        return (
            <DeleteDialog
                isOpen={isDeleteOpen}
                movie_id={movieId}
                onCloseDeleteDialog={onCloseDeleteDialog}
                onDeleteSuccess={onDeleteSuccess}
            />
        )
    }, [isDeleteOpen, movieId])

    const showMovieCards = useMemo(() => {
        return movies.length > 0 ? (
            movies.map((movie: IMovieUpdate, index: number) => (
                <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                    <MovieCard
                        header={movie.name}
                        content={movie.description}
                        image={movie.image}
                        video={movie.video}
                        movieIndex={index}
                        onEditMovie={onEditMovie}
                        onDeleteMovie={onDeleteMovie}
                        onVideoPlay={onVideoPlay}
                    />
                </Grid>
            ))
        ) : (
            <p style={{ fontSize: "20px", textAlign: "center", width: "100%" }}>
                There is no movie...
            </p>
        )
    }, [movies])

    const showVideoModal = useMemo(() => {
        return <ModalVideo
            channel='custom'
            autoplay
            isOpen={isModalVideoOpen}
            url={videoUrl}
            onClose={() => setIsModalVideoOpen(false)} />
    }, [isModalVideoOpen])

    return (
        <main>
            <div className={classes.heroContent}>
                <Container className={classes.actionTopView}>
                    <Button
                        className={classes.addNewButton}
                        variant="contained"
                        color="primary"
                        onClick={handleAddNewMovie}
                    >
                        Add New +
                    </Button>
                </Container>
                <Container className={classes.cardGrid}>
                    <InfinitScroll
                        dataLength={total}
                        next={() => handleNextPage()}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                        style={{ overflow: "inherit" }}
                    >
                        <Grid container spacing={3}>
                            {showMovieCards}
                        </Grid>
                    </InfinitScroll>
                </Container>
            </div>
            {showMovieDialog}
            {showDeleteDialog}
            {showVideoModal}
        </main>
    )
}

export default HomeView
