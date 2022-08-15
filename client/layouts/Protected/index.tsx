import Router from 'next/router'
import { ReactNode, useEffect } from 'react'
import { isAuthenticated } from '../../variables'


type Props = {
    children: ReactNode
}

export const Protected = ({ children }: Props): any => {
    if (isAuthenticated) return children
    useEffect(() => { !isAuthenticated && Router.push("/auth/login") }, [])
}
