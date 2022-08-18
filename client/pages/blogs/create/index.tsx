import React, { useState } from 'react'
import Input from '../../../components/Input/Input'
import { useTheme } from '../../../context/them.context'
import Container from '../../../layouts/Container/Container'
import classes from "./createBlog.module.scss"
import Router from 'next/router'
import { submitForm } from '../../auth/form.logic'

const CreateBlog = (): JSX.Element => {
    const { theme } = useTheme();
    const [message, setMessage] = useState<string>()

    const submitHandler = submitForm({ path: "/blogs", method: "POST" }, (result: any) => {
        if (result.success) {
            return Router.push("/blogs");
        }
        setMessage(result.message);
    })
    return (
        <Container>
            <form onSubmit={submitHandler} className={`${classes.wrapper} ${classes[theme]}`}>
                {message && <h2>{message}</h2>}
                <Input type='text' label='Title' placeholder='Title' forNameId='title' />
                <Input type='text' label='Snippet' placeholder='Snippet' forNameId='snippet' />
                <Input type='text' label='Auther' placeholder='Auther' forNameId='auther' />
                <Input type='text' label='Category' placeholder='Category' forNameId='category' />
                <Input type='text' label='Content' placeholder='Content' forNameId='content' />
                <button>Create</button>
            </form>
        </Container>
    )
}

export default CreateBlog
