import { NextComponentType } from 'next'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import classes from "./navbar.module.scss"
import { useTheme } from '../../context/them.context'
import Button from '../../components/Button/Button'
import { useProtect } from '../../hook/useProtect'



const Navbar: NextComponentType = () => {

    const { theme, toggleTheme } = useTheme();
    const { user } = useProtect();


    return (
        <nav className={`${classes.navbar} ${classes[theme]}`}>
            <div>
                <Link href="/">
                    <h1 className={classes.logo}>Logo</h1>
                </Link>
            </div>

            <div>
                <Link href="/auth/login">Login</Link>
                <Button link="/auth/register" type='button' text='Register' />
                <Link href='/profile'>Profile</Link>
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
