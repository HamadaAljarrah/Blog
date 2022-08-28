import { NextComponentType } from 'next'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import classes from "./navbar.module.scss"
import { useTheme } from '../../context/them.context'
import Button from '../../components/Button/Button'
import { useProtect } from '../../hook/useProtect'
import { useAuth } from '../../context/auth.context'



const Navbar = () => {

    const { theme, toggleTheme } = useTheme();
    const {isAuthenticated} = useAuth();

    return (
        <nav className={`${classes.navbar} ${classes[theme]}`}>
            <div>
                <Link href="/">
                    <h1 className={classes.logo}>Logo</h1>
                </Link>
            </div>

            <div>
                {!isAuthenticated &&
                    <>
                        <Link href="/auth/login">Login</Link>
                        <Button link="/auth/register" type='button' text='Register' />
                    </>
                }

                {isAuthenticated && <Link href='/profile'>Profile</Link>}
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
