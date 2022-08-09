import { Response } from "express"
import { BlogDeleteReq, BlogGetReq, BlogPostReq, BlogPutReq, IBlog } from "./blog.interface"
import { fetchBlogs, getBlog, validateBlogContent, createNewBlog, updateBlog, getCurrentTime, calcReadTime, removeBlog } from "./blog.service";



class BlogController {
    constructor() { }

    async getAllBlogs(req: BlogGetReq, res: Response) {

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

    async readBlog(req: BlogGetReq, res: Response) {
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
    async createBlog(req: BlogPostReq, res: Response) {
        try {

            const data = req.body
            const valResult = validateBlogContent(data)
            if (!valResult.success) {
                res.status(valResult.status).json({
                    success: false,
                    message: valResult.message,
                })
            }
            const createAt = getCurrentTime();
            const readTime = calcReadTime(req.body.content) + calcReadTime(req.body.snippet)
            const newBlog = await createNewBlog(data, readTime, createAt)
                .then(() => {
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

    async updateBlog(req: BlogPutReq, res: Response) {
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
                category: req.body.category,
                readTime: readTime,
                edited: edited,
            }
            await updateBlog(id, updated)
                .then(() => {
                    return res.status(200).json({
                        success: true,
                        message: "Blog was updated",
                    })
                })
        } catch (error) {

            res.status(400).json({
                success: false,
                message: error,
            })
        }
    }

    async deleteBlog(req: BlogDeleteReq, res: Response) {
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
                .then(() => {
                    return res.status(200).json({
                        success: true,
                        message: "Blog was deleted",
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