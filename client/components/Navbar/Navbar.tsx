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
                <Link href="/price">Price</Link>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
                <p onClick={toggleTheme}>Theme</p>
            </div>

            <div>
                <Link href="/login">Login</Link>
                <Link href="/register">
                    <a className={classes.register}>Register</a>
                </Link>
            </div>

        </nav>
    )
}

export default Navbar
