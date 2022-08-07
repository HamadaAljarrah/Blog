import { Application } from "express";
import { RouteConfig } from "../Common/RouteConfig";
import blogController from "./blog.controller";


export class BlogRoutes extends RouteConfig {
    constructor(app: Application) {
        super(app, "BlogRouter")
    }

    configureRoutes(): Application {

        this.app.route("/blogs").get([blogController.getAllBlogs])
        this.app.route("/blogs/:id").get([blogController.readBlog])
        this.app.route("/blogs").post([blogController.createBlog])
        this.app.route("/blogs/:id").put([blogController.updateBlog])
        this.app.route("/blogs/:id").delete([blogController.deleteBlog])
        return this.app
    }
}
