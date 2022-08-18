import React from 'react'
import BlogCard from '../../components/BlogCard/BlogCard'
import Container from '../../layouts/Container/Container'
import { BlogInfo } from '../../components/BlogCard/BlogCard'
import { SERVER_URL } from '../../variables'
import classes from "./blogs.module.scss"
import { useTheme } from '../../context/them.context'


const Blogs = ({ blogs }: any): JSX.Element => {
    const { theme } = useTheme()
    return (
        <Container>
            <div className={`${classes.wrapper} ${classes[theme]}`}>
                <h1>Blogs</h1>
                {blogs.map((blog: BlogInfo) => {
                    return <BlogCard
                        key={blog._id}
                        title={blog.title}
                        snippet={blog.snippet}
                        category={blog.category}
                        auther={blog.auther}
                        createAt={(blog.createAt).split(" ")[0]}
                        readTime={Math.round(blog.readTime)}
                        _id={blog._id}
                    />
                })}
            </div>
        </Container>
    )
}

export default Blogs

export async function getStaticProps() {
    const response = await fetch(SERVER_URL + "/blogs")
    const result = await response.json()
    const { data } = result
    return {
        props: {
            blogs: data
        }
    }
} 