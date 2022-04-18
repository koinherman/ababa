import React, { ReactElement } from "react"
import Typography from "@material-ui/core/Typography"
import Toolbar from "@material-ui/core/Toolbar"
import CameraIcon from "@material-ui/icons/PhotoCamera"
import CssBaseline from "@material-ui/core/CssBaseline"
import AppBar from "@material-ui/core/AppBar"
import { makeStyles } from "@material-ui/core/styles"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import { useHistory } from "react-router-dom"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import useAuth from "../../hooks/useAuth"
import { IUser } from "../../interfaces"

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2)
    },
    appBarView: {
        display: "flex",
        justifyContent: "space-between"
    }
}))

function Header(): ReactElement {
    const classes = useStyles()
    const history = useHistory()
    const { logout, user } = useAuth()

    const signOut = () => {
        setAnchorEl(null)
        logout()
        history.push("/login")
    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <CssBaseline />
            <AppBar position="relative">
                <div className={classes.appBarView}>
                    <Toolbar>
                        <CameraIcon className={classes.icon} />
                        <Typography variant="h6" color="inherit" noWrap>
                            Movie layout
                        </Typography>
                    </Toolbar>
                    <Toolbar>
                        <Button onClick={handleClick}>
                            <Avatar alt="Remy Sharp" />
                        </Button>
                    </Toolbar>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        style={{ marginTop: "47px" }}
                    >
                        <MenuItem>{(user as IUser).email}</MenuItem>
                        <MenuItem onClick={() => signOut()}>
                            <ExitToAppIcon
                                fontSize="small"
                                style={{ color: "#000000", marginRight: "10px" }}
                            />
                            Logout
                        </MenuItem>
                    </Menu>
                </div>
            </AppBar>
        </>
    )
}

export default Header
