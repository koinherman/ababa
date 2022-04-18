import React from "react"
import { Redirect } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import LoadingScreen from "../../components/LoadingScreen"

// ----------------------------------------------------------------------

const AuthProtect: React.FC = ({ children }) => {
    const { isLoading, isAuthenticated } = useAuth()

    if (isLoading) {
        return <LoadingScreen />
    }

    if (!isAuthenticated) {
        return <Redirect to="/login" />
    }

    return <>{children}</>
}

export default AuthProtect
