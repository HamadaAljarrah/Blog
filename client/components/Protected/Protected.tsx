import { ReactNode, useEffect } from 'react'
import Router from "next/router"
type Props = {
    children: ReactNode,
    isAuth: boolean
}


const Protected = ({ children, isAuth }: Props): any => {
    if (isAuth) return children;
    return Router.push("/auth/login")
}

export default Protected;