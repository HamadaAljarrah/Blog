import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getWithExpiry } from "../helpers/jwt";


type Props = {
    children: ReactNode
}


const authContext: any = createContext({})
export const AuthProvider = ({ children }: Props) => {
    let authStatus: boolean;
    let checkAuth: any;
    useEffect(() => {
        checkAuth = getWithExpiry("token");

    })

    checkAuth == null ? authStatus = false : authStatus = true;
    const [isAthenticated, setIsAuthenticated] = useState<boolean>(authStatus)
    return (
        <authContext.Provider value={{ isAthenticated, setIsAuthenticated }}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => useContext(authContext)