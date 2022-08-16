import React from 'react'
import { useTheme } from '../../context/them.context'
import classes from "./blogCard.module.scss"


const BlogCard = () => {
    const { theme } = useTheme();


    return (
        <div className={`${classes.card} ${classes[theme]}`}>
            <img src="./img/food.jpg" alt="food" />
            <div className={classes.wrapper}>
                <div className={classes.header}>
                    <h3>Title</h3>
                    <p>Category</p>
                </div>
                <p>Snippet</p>
                <div className={classes.footer}>
                    <p>auther</p>
                    <p>read Time</p>
                </div>

            </div>
        </div>
    )
}

export default BlogCard