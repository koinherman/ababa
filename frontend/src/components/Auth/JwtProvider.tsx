import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getInitialize } from "../../redux/slices/authJwt"

const JwtProvider: React.FC = ({ children }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getInitialize())
    }, [dispatch])

    return <>{children}</>
}

export default JwtProvider
