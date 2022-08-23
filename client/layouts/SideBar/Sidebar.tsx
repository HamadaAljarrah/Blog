import Link from 'next/link'
import React from 'react'
import { useTheme } from '../../context/them.context'
import classes from "./sideBar.module.scss"
import { Home, Create, Bookmark, FilledBookmark, FilledHome, FilledCreate } from '../../components/Icons/icons'
const Sidebar = () => {
    const { theme } = useTheme();
    return (
        <div className={`${classes.wrapper} ${classes[theme]}`}>
            <div>
                <Home link='/' />
                <Bookmark link='/bookmark' />
                <Create link='/blogs/create' />
            </div>

        </div>
    )
}

export default Sidebar
