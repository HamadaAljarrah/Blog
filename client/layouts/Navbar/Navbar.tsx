import { NextComponentType } from 'next'
import React from 'react'
import Link from 'next/link'
import classes from "./navbar.module.scss"
import { useTheme } from '../../context/them.context'



const Navbar: NextComponentType = () => {

    const { theme, toggleTheme } = useTheme();

    return (
        <nav className={`${classes.navbar} ${classes[theme]}`}>
            <div>
                <h1>Logo</h1>
            </div>
            <div>
                <Link href="/">Home</Link>
                <Link href="/blogs">Blogs</Link>
                <Link href="/blogs/create">Create</Link>
                <Link href="/about">About</Link>

            </div>

            <div>
                <Link href="/profile">Profile</Link>
                <Link href="/auth/login">Login</Link>
                <Link href="/auth/register">
                    <a className={classes.register}>Register</a>
                </Link>
                <button onClick={toggleTheme}>{theme === 'dark' ? 'Change to light' : 'Change to dark '}</button>
            </div>

        </nav>
    )
}

export default Navbar
