import Link from 'next/link'
import React from 'react'
import { useTheme } from '../../context/them.context'
import { Bookmark } from '../Icons/icons'
import classes from "./blogCard.module.scss"

export type BlogInfo = {
    title: string,
    snippet: string,
    category: string,
    auther: string,
    createAt: string,
    readTime: number,
    _id: string
}

const BlogCard = ({ title, snippet, category, auther, createAt, readTime, _id }: BlogInfo) => {
    const { theme } = useTheme();
    return (
        <>
            <Link href={`/blogs/${_id}`}>
                <div className={`${classes.card} ${classes[theme]}`}>
                    <div className={classes.image}>
                        <div className={classes.overlay}></div>
                        <img src="./img/women.png" alt="food" />
                    </div>

                    <div className={classes.wrapper}>
                        <div className={classes.header}>
                            <h3>{title}</h3>
                            <p>{category}</p>
                        </div>
                        <p className={classes.snippet}>{snippet}</p>

                        <div className={classes.footer}>
                            <p>By {auther}</p>
                            <div>
                                <p>{createAt}</p>
                                <p>{readTime} min</p>
                            </div>
                        </div>

                    </div>

                </div>
            </Link>
        </>



    )
}

export default BlogCard