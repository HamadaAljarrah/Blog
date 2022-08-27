import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { checkIfLoggedin } from "../helpers/auth";
import { getWithExpiry } from "../helpers/jwt";
import { User } from "../types/user";


type Props = {
    children: ReactNode
}
type AuthState = {
    user: User | undefined,
    isAuthenticated: boolean | undefined
}
const initValue: AuthState = {
    user: undefined,
    isAuthenticated: false,

}
const authContext = createContext<AuthState>(initValue)


export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User>()
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>()

    const getAuthState = async () => {
        const token = getWithExpiry("token");
        const isLoggedIn = await checkIfLoggedin(token);
        console.log("running");
        
        if (!isLoggedIn.success) {
            setUser(undefined)
            setIsAuthenticated(false)
        } else {
            setUser(isLoggedIn.data)
            setIsAuthenticated(true)
        }
    }
    useEffect(()=>{getAuthState()},[])

    return (
        <authContext.Provider value={{user,isAuthenticated}}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => useContext(authContext)