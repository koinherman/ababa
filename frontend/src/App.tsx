import { ReactElement } from "react"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/lib/integration/react"
import { createBrowserHistory } from "history"
import { Router } from "react-router-dom"
import LoadingScreen from "./components/LoadingScreen"
import { store, persistor } from "./redux/store"
import routes, { renderRoutes } from "./routes"
import JwtProvider from "./components/Auth/JwtProvider"

const history = createBrowserHistory()

function App(): ReactElement {
    return (
        <Provider store={store}>
            <PersistGate loading={<LoadingScreen />} persistor={persistor}>
                <Router history={history}>
                    <JwtProvider>{renderRoutes(routes)}</JwtProvider>
                </Router>
            </PersistGate>
        </Provider>
    )
}

export default App
