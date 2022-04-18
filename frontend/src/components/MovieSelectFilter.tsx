import { createStyles, makeStyles, withStyles, Theme } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import InputBase from "@material-ui/core/InputBase"
import { IFilter, ISelectFilter } from "../interfaces"
import { useMemo, ReactElement } from "react"

const BootstrapInput = withStyles((theme: Theme) =>
    createStyles({
        root: {
            "label + &": {
                marginTop: theme.spacing(3)
            }
        },
        input: {
            position: "relative",
            backgroundColor: theme.palette.background.paper,
            borderBottom: "1px solid #888888",
            fontSize: 16,
            padding: "10px 26px 10px 12px",
            transition: theme.transitions.create(["border-color", "box-shadow"]),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                "-apple-system",
                "BlinkMacSystemFont",
                '"Segoe UI"',
                "Roboto",
                '"Helvetica Neue"',
                "Arial",
                "sans-serif",
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"'
            ].join(","),
            "&:focus": {
                borderColor: "#80bdff",
                boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
            }
        }
    })
)(InputBase)

const useStyles = makeStyles(() =>
    createStyles({
        margin: {
            minWidth: "150px",
            width: "100%"
        }
    })
)

function MovieSelectFilter(props: ISelectFilter): ReactElement {
    const classes = useStyles()

    const showMenuItems = useMemo(
        () =>
            props.datas &&
            props.datas.map((filter: IFilter) => (
                <MenuItem key={filter.id} value={filter.id}>
                    {filter.name}
                </MenuItem>
            )),
        [props.datas]
    )

    return (
        <div>
            <FormControl className={classes.margin}>
                <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={props.value}
                    onChange={props.handleChange}
                    input={<BootstrapInput />}
                >
                    {showMenuItems}
                </Select>
            </FormControl>
        </div>
    )
}

export default MovieSelectFilter
