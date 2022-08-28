import { useState } from "react"
import classes from "./createBlog.module.scss"

import Input from '../../../components/Input/Input'
import TextArea from '../../../components/TextArea/TextArea'
import Button from '../../../components/Button/Button'
import Select from '../../../components/Select/Select'
import UploadFile from '../../../components/UploadFile/UploadFile'
import Router from "next/router"

import { useTheme } from '../../../context/them.context'
import { useForm } from "react-hook-form"
import { Blog } from "../../../types/blog"
import { sendCreateBlogRequset, uploadIamge } from "../../../helpers/blog"
import { Protected } from "../../../components/Protected/Protected"
import PageWrapper from "../../../layouts/PageWrapper/PageWrapper"



export type BlogData = Omit<Blog, '_id' | 'createAt' | 'editAt' | 'readTime'>

const CreateBlog = () => {
    const { theme } = useTheme();
    const [message, setMessage] = useState<string>()
    const { register, handleSubmit } = useForm<BlogData>()

    const onSubmit = async (data: BlogData) => {
        const contentRes = await sendCreateBlogRequset({ ...data, auther: "will be dynamic" })

        if (contentRes.success) {
            return Router.push("/blogs");
        }
        setMessage(contentRes.message)

    }

    return (
        <Protected>
            <PageWrapper>
                <form onSubmit={handleSubmit(onSubmit)} className={`${classes.wrapper} ${classes[theme]}`}>
                    {message && <h2>{message}</h2>}
                    <Input
                        register={register('title')}
                        htmlFor='title'
                        type='text'
                        label='Title'
                        placeholder='Title'
                    />
                    <TextArea
                        register={register('snippet')}
                        htmlFor='snippet'
                        label='Snippet'
                    />
                    <TextArea
                        register={register('content')}
                        htmlFor='content'
                        label='Content'
                        height={600}
                    />
                    <div className={classes.towFlex}>
                        <Select
                            register={register('category')}
                            htmlFor='category'
                            label='Category'
                        />
                        <UploadFile
                            register={register('image')}
                        />
                    </div>
                    <Button text='Publish' type='submit' />
                </form>
            </PageWrapper>
        </Protected>

    )
}

export default CreateBlog




// import React, { useRef, useState } from 'react'
// import Input from '../../../components/Input/Input'
// import { useTheme } from '../../../context/them.context'
// import classes from "./createBlog.module.scss"
// import { useRouter } from 'next/router'
// import TextArea from '../../../components/TextArea/TextArea'
// import Button from '../../../components/Button/Button'
// import Select from '../../../components/Select/Select'
// import UploadFile from '../../../components/UploadFile/UploadFile'
// import { SERVER_URL } from '../../../variables'
// import { getWithExpiry } from '../../../helpers/jwt'



// const CreateBlog = () => {
//     const { theme } = useTheme();
//     const router = useRouter();
//     const [message, setMessage] = useState<string>()

//     const [fileSelected, setFileSelected] = useState<File>()
//     const titleRef = useRef<any>()
//     const snippetRef = useRef<any>()
//     const contentRef = useRef<any>()
//     const categoryRef = useRef<any>()


//     const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
//         const fileList = e.target.files;
//         if (!fileList) return;
//         setFileSelected(fileList[0]);
//     };

//     // const uploadFile = async function () {
//     //     if (fileSelected) {
//     //         const formData = new FormData();
//     //         formData.append("image", fileSelected, ("img-" + Date.now().toString()));

//     //         await fetch(SERVER_URL + "/test", {
//     //             method: "POST",
//     //             body: formData
//     //         })
//     //     }
//     // };

//     const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault()
//         const token = getWithExpiry("token");
//         const formData = new FormData();
//         formData.append("title", titleRef.current.value)
//         formData.append("snippet", snippetRef.current.value)
//         formData.append("content", contentRef.current.value)
//         formData.append("category", "category")
//         formData.append("image", fileSelected || "No Image")
//         formData.append("auther", "will be dynamic")


//         const response = await fetch(SERVER_URL + "/blogs", {
//             method: "POST",
//             headers: {
//                 "Authorization": `Bearer ${token}`
//             },
//             body: formData
//         })
//         const result = await response.json()
//         if (result.success) return router.push("/blogs")
//         setMessage(result.message)
//     }






//     return (
//         <form onSubmit={submitHandler} encType="multipart/form-data" className={`${classes.wrapper} ${classes[theme]}`}>
//             {message && <h2>{message}</h2>}
//             <Input ref={titleRef} type='text' label='Title' placeholder='Title' forNameId='title' />
//             <TextArea ref={snippetRef} forNameId='snippet' label='Snippet' />
//             <TextArea ref={contentRef} forNameId='content' label='Content' height={600} />
//             <div className={classes.towFlex}>
//                 <Select ref={categoryRef} />
//                 <UploadFile onChange={handleImageChange} />
//             </div>
//             <Button text='Publish' type='submit' />
//         </form>

//     )
// }

// export default CreateBlog


