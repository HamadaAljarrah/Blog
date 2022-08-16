import { createContext, ReactNode, useContext } from "react";


type Props = {
    children: ReactNode
}


const authContext = createContext(false)
export const AuthProvider = ({ children }: Props) => {
    return (
        <authContext.Provider value={true}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => useContext(authContext)