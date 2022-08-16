import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode,
    isLoading: boolean,
    isError: any
}

export const Protected = ({ children, isError, isLoading }: Props) => {
    if (isError) return <div>Error</div>
    if (isLoading) return <div>isLoading</div>
    return <>{children}</>

}
