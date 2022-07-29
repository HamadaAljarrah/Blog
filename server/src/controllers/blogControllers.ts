import { CRUD } from "../interfaces";
import express, { Response, Request, NextFunction } from "express"
import { connectToMongo } from "../helpers/db";
import { Blog } from "../models/blog";
import mongoose from "mongoose";


export class BlogController implements CRUD {
    private router = express.Router();
    private basePath = "/blog";
    constructor() {
        this.router.get(`${this.basePath}/:id`, this.read());
        this.router.post(`${this.basePath}/`, this.create());
        this.router.put(`${this.basePath}/:id`, this.update());
        this.router.delete(`${this.basePath}/:id`, this.delete());
    }
    read() {
        return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
            try {
                //Extraxt id from url
                const { id } = req.params;
                connectToMongo();

                //search the blog in database
                const blog = await Blog.findById(id);
                if (blog == null) {
                    return res.status(404)
                        .json({ success: false, message: "Blog was not found" })
                }

                //send the blog in the respone
                return res.status(200) //ok
                    .json({ success: true, message: "Blog was found", blog })
            } catch (error) {
                console.log(error);
                return res.status(500)
                    .json({ success: false, message: "server error occurred" })
            }
        }
    }
    create() {
        return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
            try {
                //extract data from the request
                const { title, snippet, body, auther, category } = req.body;
                if (!(title && snippet && body && auther && category)) {
                    return res.status(400)
                        .json({ success: false, message: "All fields are required" })
                }
                const date = Date.now()
                const readTime = 12;

                //create the blog with blog
                connectToMongo();
                const blog = await Blog.create({ title, snippet, body, auther, category, date, readTime })
                return res.status(200) //ok
                    .json({ success: true, message: "Blog was created", blog })
            } catch (error) {
                console.log(error);
                return res.status(500)
                    .json({ success: false, message: "server error occurred" })
            }
        }
    }
    update() {
        return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
            try {
                //Extraxt id from url
                const { id } = req.params;
                const _id = new mongoose.Types.ObjectId(id)

                //extract data from the request
                const { title, snippet, body, auther, category } = req.body;
                if (!(title && snippet && body && auther && category)) {
                    return res.status(400)
                        .json({ success: false, message: "All fields are required" })
                }

                //create an updated blog and updated in database
                const updated = {
                    title,
                    snippet,
                    body,
                    auther,
                    category,
                    readTime: 12,
                    edited: Date.now()
                }
                connectToMongo();
                const blog = await Blog.findOneAndUpdate(_id, updated);
                return res.json({ success: true, message: "Blog was updated", blog })

            } catch (error) {
                console.log(error);
                return res.status(500)
                    .json({ success: false, message: "server error occurred" })
            }
        }
    }
    delete() {
        return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
            try {
                //Extraxt id from url
                const { id } = req.params;
                const _id = new mongoose.Types.ObjectId(id)

                //search the blog in database
                connectToMongo();

                const isDeleted = await Blog.findOneAndDelete(_id);
                if (isDeleted) {
                    return res.status(200)
                        .json({ success: true, message: "Blog was deleted" })
                }
                return res.status(404)
                    .json({ success: false, message: "Blog was not found" })

            } catch (error) {
                console.log(error);
                return res.status(500)
                    .json({ success: false, message: "server error occurred" })
            }
        }
    }


}