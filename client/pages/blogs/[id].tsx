import React from 'react'
import { useTheme } from '../../context/them.context'
import PageWrapper from '../../layouts/PageWrapper/PageWrapper'
import { SERVER_URL } from '../../variables'
import classes from "./blogPost.module.scss"

const BlogPost = ({ blog }: any) => {
    const { theme } = useTheme()
    return (
        <PageWrapper>
            <div className={`${classes.wrapper} ${classes[theme]}`}>
                <div className={classes.head}>
                    <h4>{blog.category}</h4>
                    <p>{blog.createAt}</p>
                </div>

                <div className={classes.header} >
                    <div className={classes.title}>
                        <h1>{blog.title}</h1>
                        <h1 className={classes.line}>__</h1>
                    </div>
                    <p>By {blog.auther}</p>
                </div>

                <p className={classes.snippet}>{blog.snippet}</p>
                <p className={classes.content}>{blog.content}</p>

            </div>
        </PageWrapper >

    )
}

export default BlogPost

export async function getStaticPaths() {

    const response = await fetch(SERVER_URL + "/blogs")
    const result = await response.json();
    const paths = result.data.map((blog: any) => ({ params: { id: blog._id } }))
    return { paths, fallback: false }
}

export async function getStaticProps({ params }: any) {

    const response = await fetch(SERVER_URL + "/blogs/" + params.id)
    const result = await response.json();

    return {
        props: {
            blog: result.data || null
        }
    }
}