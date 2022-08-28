import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { checkIfLoggedin } from "../helpers/auth";
import { getWithExpiry } from "../helpers/auth";
import { User } from "../types/user";


type Props = {
    children: ReactNode
}
type AuthState = {
    isAuthenticated: boolean | undefined,
    setIsAuthenticated: any
}
const initValue: AuthState = {
    setIsAuthenticated: () => { },
    isAuthenticated: false,

}
const authContext = createContext<AuthState>(initValue)


export const AuthProvider = ({ children }: Props) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>()

    const getAuthState = async () => {
        const token = getWithExpiry("token");
        const isLoggedIn = await checkIfLoggedin(token);
        console.log("running");

        if (!isLoggedIn.success) {
            setIsAuthenticated(false)
        } else {
            setIsAuthenticated(true)
        }
    }
    useEffect(() => { getAuthState() }, [])

    return (
        <authContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => useContext(authContext)