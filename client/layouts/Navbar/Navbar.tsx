import { NextComponentType } from 'next'
import React from 'react'
import Link from 'next/link'
import classes from "./navbar.module.scss"
import { useTheme } from '../../context/them.context'
import Button from '../../components/Button/Button'



const Navbar: NextComponentType = () => {

    const { theme, toggleTheme } = useTheme();


    return (
        <nav className={`${classes.navbar} ${classes[theme]}`}>
            <div>
                <Link href="/">
                    <h1 className={classes.logo}>Logo</h1>
                </Link>
            </div>

            <div>
                <>
                    <Link href="/auth/login">Login</Link>

                    <Button link="/auth/register" type='button' text='Register' />
                </>

                <button
                    className={classes.mode}
                    onClick={toggleTheme}>
                    {theme === 'dark' ? 'Change to light' : 'Change to dark '}
                </button>
            </div>

        </nav>
    )
}

export default Navbar
