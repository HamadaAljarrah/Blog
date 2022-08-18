import React from 'react'
import { useTheme } from '../../context/them.context'
import Container from '../../layouts/Container/Container'
import { SERVER_URL } from '../../variables'
import classes from "./blogPost.module.scss"

const BlogPost = ({ blog }: any) => {
    const { theme } = useTheme()
    return (
        <Container>
            <div className={`${classes.wrapper} ${classes[theme]}`}>
                {blog.title} <br />
                {blog.snippet} <br />
                {blog.content} <br />
                {blog.auther} <br />
                {blog.createAt} <br />
            </div>
        </Container>

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