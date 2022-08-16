import React from 'react'
import BlogCard from '../../components/BlogCard/BlogCard'
import Container from '../../layouts/Container/Container'

const Blogs = (): JSX.Element => {
    return (
        <Container>
            <h1>Blogs page</h1>
            <BlogCard />
        </Container>
    )
}

export default Blogs