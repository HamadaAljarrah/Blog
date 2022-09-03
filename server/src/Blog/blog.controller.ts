import { Response } from "express"
import { BlogReq, IBlog } from "./blog.interface"
import { fetchBlogs, getBlog, validateBlogContent, updateBlog, getCurrentTime, calcReadTime, removeBlog, createNewBlog } from "./blog.service";



class BlogController {
    constructor() { }

    async getAllBlogs(req: BlogReq, res: Response) {

        try {

            const blogs: IBlog[] = await fetchBlogs()
            if (blogs.length === 0) {
                return res.status(200).json({
                    success: true,
                    message: "There is no blogs yet. Create one!",
                })
            }

            res.status(200).json({
                success: true,
                message: "All blogs sended",
                data: blogs
            })

        } catch (error) {

            res.status(400).json({
                success: false,
                message: "Failed to get blogs",
            })

        }

    }
    async getAllUserBlogs(req: BlogReq, res: Response) {

        try {
            const {userId} = req.params.id
            const blogs: IBlog[] = await fetchBlogs(userId)
            if (blogs.length === 0) {
                return res.status(200).json({
                    success: true,
                    message: "There is no blogs yet. Create one!",
                })
            }

            res.status(200).json({
                success: true,
                message: "All blogs sended",
                data: blogs
            })

        } catch (error) {

            res.status(400).json({
                success: false,
                message: "Failed to get blogs",
            })

        }

    }

    async readBlog(req: BlogReq, res: Response) {
        try {

            const { id } = req.params;
            const blog = await getBlog(id)
            if (blog == null) {

                return res.status(404).json({
                    success: false,
                    message: "Blog was not found",
                })
            }

            res.status(200).json({
                success: true,
                message: "Blog was sended",
                data: blog
            })

        } catch (error) {

            res.status(400).json({
                success: false,
                message: error,
            })

        }
    }


    async createBlog(req: BlogReq, res: Response) {
        try {

            const valResult = validateBlogContent(req.body)
            if (!valResult.success) {
                res.status(valResult.status).json({
                    success: false,
                    message: valResult.message,
                })
            }
            const createAt = getCurrentTime();
            const readTime = calcReadTime(req.body.content) + calcReadTime(req.body.snippet)


            createNewBlog(req.body, readTime, createAt)
                .then((newBlog) => {
                    res.status(200).json({
                        success: true,
                        message: "Blog was created",
                        data: newBlog
                    })
                })

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error,
            })
        }
    }

    async updateBlog(req: BlogReq, res: Response) {
        try {
            const { id } = req.params;
            const blog = await getBlog(id);

            if (blog == null) {
                res.status(404).json({
                    success: false,
                    message: "Blog was not found",
                })
            }

            const data = req.body
            const valResult = validateBlogContent(data)
            if (!valResult.success) {
                return res.status(valResult.status).json({
                    success: false,
                    message: valResult.message,
                })
            }

            const edited = getCurrentTime();
            const readTime = calcReadTime(req.body.content) + calcReadTime(req.body.snippet)

            const updated = {
                title: req.body.title,
                snippet: req.body.snippet,
                content: req.body.content,
                auther: req.body.auther,
                autherId: req.body.autherId,
                category: req.body.category,
                readTime: readTime,
                edited: edited,
                image: "upload/test"
            }

            await updateBlog(id, updated)
                .then((updatedBlog) => {
                    res.status(200).json({
                        success: true,
                        message: "Blog was updated",
                        data: updatedBlog
                    })
                })


        } catch (error) {

            res.status(400).json({
                success: false,
                message: error,
            })
        }
    }

    async deleteBlog(req: BlogReq, res: Response) {
        try {
            const { id } = req.params;
            const blog = await getBlog(id);

            if (blog == null) {
                res.status(404).json({
                    success: false,
                    message: "Blog was not found",
                })
            }

            await removeBlog(id)
                .then((deletedBlog) => {
                    return res.status(200).json({
                        success: true,
                        message: "Blog was deleted",
                        data: deletedBlog
                    })
                })

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error,
            })
        }
    }
}

export default new BlogController