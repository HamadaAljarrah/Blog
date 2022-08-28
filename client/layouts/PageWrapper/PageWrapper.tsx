import React, { ReactNode } from 'react'
import classes from "./pageWrapper.module.scss"
type Props = {
    children: ReactNode
}

const PageWrapper = ({ children }: Props) => {

    return (
        <div className={classes.container}>
            {children}
        </div>
    )
}

export default PageWrapper