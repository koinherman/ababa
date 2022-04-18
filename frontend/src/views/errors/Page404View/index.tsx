import { ReactElement } from "react"
import AppBar from "@material-ui/core/AppBar"
import CameraIcon from "@material-ui/icons/PhotoCamera"
import CssBaseline from "@material-ui/core/CssBaseline"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Link from "@material-ui/core/Link"
import { ReactComponent as NotFoundImage } from "../../../assets/image/undraw_page_not_found_su7k.svg"

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="">
                Book Management
            </Link>{" "}
            {new Date().getFullYear()}.
        </Typography>
    )
}

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2)
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(18, 0, 6),
        textAlign: "center"
    },
    notFoundImage: {
        maxWidth: "500px",
        height: "fit-content",
        width: "100%"
    }
}))

function Page404View(): ReactElement {
    const classes = useStyles()

    return (
        <>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <CameraIcon className={classes.icon} />
                    <Typography variant="h6" color="inherit" noWrap>
                        404 Page
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="lg">
                        <Typography component="h3" variant="h3" align="center" color="textPrimary">
                            404 Page: The page you are looking for isn’t here
                        </Typography>
                        <Typography align="center" color="textSecondary" paragraph>
                            You either tried some shady route or you came here by mistake. Whichever
                            it is, try using the navigation.
                        </Typography>
                        <NotFoundImage className={classes.notFoundImage} />
                    </Container>
                </div>
            </main>
            <Copyright />
        </>
    )
}

export default Page404View
