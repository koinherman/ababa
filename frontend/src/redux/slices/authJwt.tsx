import { createSlice } from "@reduxjs/toolkit"
import jwtDecode from "jwt-decode"
import axios from "axios"
import { IRegister, ILogin, IDecoded } from "../../interfaces"

const initialState = {
    isLoading: false,
    isAuthenticated: false,
    user: {}
}

const slice = createSlice({
    name: "authJwt",
    initialState,
    reducers: {
        // START LOADING
        startLoading(state) {
            state.isLoading = true
        },

        // INITIALISE
        getInitialize(state, action) {
            state.isLoading = false
            state.isAuthenticated = action.payload.isAuthenticated
            state.user = action.payload.user
        },

        // AUTH SUCCESS
        authSuccess(state, action) {
            state.isAuthenticated = true
            state.user = action.payload.user
        },

        // LOGOUT
        logoutSuccess(state) {
            state.isAuthenticated = false
            state.user = false
        }
    }
})

// Reducer
export default slice.reducer

// ----------------------------------------------------------------------

const isValidToken = (jwtToken: string) => {
    if (!jwtToken) {
        return false
    }
    const decoded: IDecoded = jwtDecode(jwtToken)
    const currentTime = Date.now() / 1000

    return decoded.exp > currentTime
}

const setSession = (jwtToken: string) => {
    if (jwtToken) {
        localStorage.setItem("jwtToken", jwtToken)
    } else {
        localStorage.removeItem("jwtToken")
    }
}

export function login(loginArgs: ILogin) {
    return async (dispatch: any) => {
        try {
            const res = await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}/user/login`,
                data: loginArgs
            })
            if (res) {
                const jwtToken = res.data.token
                setSession(jwtToken)
                const user: IDecoded = jwtDecode(jwtToken)
                dispatch(slice.actions.authSuccess({ user }))
            }
            return true
        } catch (error) {
            throw error
        }
    }
}

export function register(registerArgs: IRegister) {
    return async (dispatch: any) => {
        try {
            const res = await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}/user/register`,
                data: registerArgs
            })
            if (res) {
                const jwtToken = res.data.token
                setSession(jwtToken)
                const user: IDecoded = jwtDecode(jwtToken)
                dispatch(slice.actions.authSuccess({ user }))
            }

            return true
        } catch (error) {
            throw error
        }
    }
}

export function logout() {
    return async (dispatch: any) => {
        try {
            setSession("")

            dispatch(slice.actions.logoutSuccess())
            return true
        } catch (error) {
            throw error
        }
    }
}

export function getInitialize() {
    return async (dispatch: any) => {
        dispatch(slice.actions.startLoading())

        try {
            const accessToken = localStorage.getItem("jwtToken")
            if (accessToken && isValidToken(accessToken)) {
                setSession(accessToken)
                const user: IDecoded = jwtDecode(accessToken)
                dispatch(
                    slice.actions.getInitialize({
                        isAuthenticated: true,
                        user: user
                    })
                )
            } else {
                dispatch(
                    slice.actions.getInitialize({
                        isAuthenticated: false,
                        user: false
                    })
                )
            }
        } catch (error) {
            dispatch(
                slice.actions.getInitialize({
                    isAuthenticated: false,
                    user: false
                })
            )
        }
    }
}
