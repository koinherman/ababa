import React from "react"
import { Redirect } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import LoadingScreen from "../LoadingScreen"

const GuestProtect: React.FC = ({ children }) => {
    const { isLoading, isAuthenticated } = useAuth()

    if (isLoading) {
        return <LoadingScreen />
    }

    if (isAuthenticated) {
        return <Redirect to="/home" />
    }

    return <>{children}</>
}

export default GuestProtect
