import { useMemo, useCallback, useState, useEffect, ReactElement } from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { Form } from "react-bootstrap"
import ReactS3Client from "react-aws-s3-typescript"
import { awsconfig } from "../config/awsconfig"
import Notification from "./Notification"
import useMovie from "../hooks/useMovie"

interface IMovieDialog {
    isOpen: boolean
    isEdit: boolean
    id?: string
    name?: string
    image?: string
    video?: string
    description?: string
    onSaveNewMovie: () => void
    onUpdateMovie: () => void
    onCloseMovieDialog: () => void
}

function MovieDialog(props: IMovieDialog): ReactElement {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [video, setVideo] = useState("")

    const { createMovie, updateMovie } = useMovie()

    const showDialogTitle = useMemo(
        () => (
            <DialogTitle id="form-dialog-title">
                {props.isEdit ? "Edit Movie" : "New Movie"}
            </DialogTitle>
        ),
        [props.isEdit]
    )

    useEffect(() => {
        if (props.isEdit) {
            props.name && setName(props.name)
            props.description && setDescription(props.description)
            props.image && setImage(props.image)
            props.video && setVideo(props.video)
        }
    }, [props])

    const initializeState = useCallback(() => {
        setName("")
        setDescription("")
        setImage("")
        setVideo("")
    }, [])

    const handleUploadImage = useCallback(async (event) => {
        const file = event.target.files[0]
        const formData = new FormData()
        formData.append("image", file)
        const filename = Date.now() + "-aws-img"
        const s3 = new ReactS3Client(awsconfig)
        try {
            const data = await s3.uploadFile(file, filename)
            setImage(data.location)
        } catch (err) {
            Notification("warning", (err as Error).message || 'Something went wrong')
        }
    }, [])

    const handleUploadVideo = useCallback(async (event) => {
        const file = event.target.files[0]
        const formData = new FormData()
        formData.append("video", file)
        const filename = Date.now() + "-aws-video"
        const s3 = new ReactS3Client(awsconfig)
        try {
            const data = await s3.uploadFile(file, filename)
            setVideo(data.location)
        } catch (err) {
            Notification("warning", (err as Error).message || 'Something went wrong')
        }
    }, [])

    const handleNameChange = useCallback((event) => {
        setName(event.target.value)
    }, [])

    const handleDescriptionChange = useCallback((event) => {
        setDescription(event.target.value)
    }, [])

    const handleUpdateMovie = useCallback(async () => {
        try {
            props.isEdit &&
                props.id &&
                (await updateMovie({
                    id: props.id,
                    name: name,
                    image: image,
                    video: video,
                    description: description
                }))

            Notification("success", "Update movie success!")
            initializeState()
            props.onUpdateMovie()
        } catch (err) {
            Notification("warning", (err as Error).message || 'Something went wrong')
        }
    }, [name, image, video, description, props])

    const handleSaveNewMovie = useCallback(async () => {
        try {
            await createMovie({
                name: name,
                image: image,
                video: video,
                description: description
            })

            Notification("success", "Save new movie success!")
            initializeState()
            props.onSaveNewMovie()
        } catch (err) {
            Notification("warning", (err as Error).message || 'Something went wrong')
        }
    }, [name, image, video, description])

    const handleCloseMovie = useCallback(() => {
        initializeState()
        props.onCloseMovieDialog()
    }, [])

    return (
        <Dialog
            open={props.isOpen}
            onClose={props.onCloseMovieDialog}
            aria-labelledby="form-dialog-title"
        >
            {showDialogTitle}
            <DialogContent>
                <br />
                <Form.Label>Image</Form.Label>
                <Form.File
                    className="custom-upload-button"
                    id="image-file"
                    custom
                    onChange={handleUploadImage}
                />
                <Form.Label>Video</Form.Label>
                <Form.File
                    className="custom-upload-button"
                    id="video-file"
                    custom
                    onChange={handleUploadVideo}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="image"
                    label="Image URL*"
                    type="text"
                    fullWidth
                    value={image}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="video"
                    label="Video URL*"
                    type="text"
                    fullWidth
                    value={video}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Movie Title*"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={handleNameChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="content"
                    label="Movie Description"
                    type="text"
                    fullWidth
                    value={description}
                    onChange={handleDescriptionChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseMovie} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={props.isEdit ? handleUpdateMovie : handleSaveNewMovie}
                    color="primary"
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default MovieDialog
