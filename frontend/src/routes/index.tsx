import NProgress from "nprogress"
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom"
import { lazy, useEffect, Suspense, Fragment } from "react"
import LoadingScreen from "../components/LoadingScreen"
import GuestProtect from "../components/Auth/GuestProtect"
import AuthProtect from "../components/Auth/AuthProtect"
import HomeLayout from "../layout/HomeLayout"

interface IRoute {
    exact?: boolean
    path?: string
    guard?: React.FC
    layout?: React.FC
    component: any
}

interface IRouteProps {
    exact: boolean
    path: string
    render: (...args: any[]) => any
}

function RouteProgress(props: IRouteProps) {
    NProgress.configure({
        speed: 500,
        showSpinner: false
    })

    useEffect(() => {
        NProgress.done()
        return () => {
            NProgress.start()
        }
    }, [])

    return <Route {...props} />
}

export function renderRoutes(routes: IRoute[] = []) {
    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingScreen />}>
                <Switch>
                    {routes.map((route: IRoute, i: number) => {
                        const Component = route.component
                        const Guard = route.guard || Fragment
                        const Layout = route.layout || Fragment

                        return (
                            <RouteProgress
                                key={i}
                                path={route.path!}
                                exact={route.exact!}
                                render={(props) => (
                                    <Guard>
                                        <Layout>
                                            {route.path !== "/" ? (
                                                <Component {...props} />
                                            ) : (
                                                route.component
                                            )}
                                        </Layout>
                                    </Guard>
                                )}
                            />
                        )
                    })}
                </Switch>
            </Suspense>
        </BrowserRouter>
    )
}

const routes: IRoute[] = [
    {
        exact: true,
        path: "/",
        component: <Redirect to="/login" />
    },
    {
        exact: true,
        guard: GuestProtect,
        path: "/login",
        component: lazy(() => import("../views/auth/LoginView"))
    },
    {
        exact: true,
        guard: GuestProtect,
        path: "/register",
        component: lazy(() => import("../views/auth/RegisterView"))
    },
    {
        exact: true,
        path: "/404",
        component: lazy(() => import("../views/errors/Page404View"))
    },
    {
        exact: true,
        guard: AuthProtect,
        layout: HomeLayout,
        path: "/home",
        component: lazy(() => import("../views/app/HomeView"))
    },
    {
        component: () => <Redirect to="/404" />
    }
]

export default routes
