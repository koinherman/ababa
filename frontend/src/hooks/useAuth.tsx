import { useSelector, useDispatch } from "react-redux"
import { login, register, logout } from "../redux/slices/authJwt"
import { IRootState } from "../redux/store"
import { IRegister, ILogin } from "../interfaces"

export default function useAuth() {
    const dispatch = useDispatch()

    const { user, isLoading, isAuthenticated } = useSelector((state: IRootState) => state.authJwt)

    return {
        user,
        isLoading,
        isAuthenticated,

        login: (loginArgs: ILogin) =>
            dispatch(
                login({
                    email: loginArgs.email,
                    password: loginArgs.password
                })
            ),

        register: (registerArgs: IRegister) =>
            dispatch(
                register({
                    email: registerArgs.email,
                    firstName: registerArgs.firstName,
                    lastName: registerArgs.lastName,
                    password: registerArgs.password
                })
            ),

        logout: () => dispatch(logout())
    }
}
