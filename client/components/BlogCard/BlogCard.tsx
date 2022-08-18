import Link from 'next/link'
import React from 'react'
import { useTheme } from '../../context/them.context'
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
        <Link href={`/blogs/${_id}`}>
            <div className={`${classes.card} ${classes[theme]}`}>

                <img src="./img/food.jpg" alt="food" />
                <div className={classes.wrapper}>
                    <div className={classes.header}>
                        <div>
                            <h3>{title}</h3>
                            <p>{category}</p>
                        </div>
                        <p>{readTime} min</p>
                    </div>
                    <p className={classes.snippet}>{snippet}</p>
                    <div className={classes.footer}>
                        <p>{auther}</p>
                        <p>{createAt}</p>
                    </div>

                </div>
            </div>
        </Link>

    )
}

export default BlogCard