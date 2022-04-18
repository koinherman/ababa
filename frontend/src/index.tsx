import ReactDOM from "react-dom"
import "./index.css"
import ReactNotification from "react-notifications-component"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import "react-notifications-component/dist/theme.css"

ReactDOM.render(
    <>
        <ReactNotification />
        <App />
    </>,
    document.getElementById("root")
)

reportWebVitals()
