import React, { ReactElement } from "react"
import CircularProgress from "@material-ui/core/CircularProgress"

function LoadingScreen(): ReactElement {
    return (
        <div
            style={{
                textAlign: "center",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                height: "90vh"
            }}
        >
            <div>
                <p style={{ fontSize: "20px" }}>Loading . . .</p>
                <CircularProgress />
            </div>
        </div>
    )
}

export default LoadingScreen
