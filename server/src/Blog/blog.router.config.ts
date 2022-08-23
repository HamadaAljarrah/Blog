import { Application } from "express";
import { RouteConfig } from "../Common/RouteConfig";
import BlogController from "./blog.controller";
import JWT from "../Common/middlewares/jwt";

export class BlogRoutes extends RouteConfig {
    constructor(app: Application) {
        super(app, "BlogRouter")
    }

    configureRoutes(): Application {

        this.app.route("/blogs").get([BlogController.getAllBlogs])
        this.app.route("/blogs/:id").get([BlogController.readBlog])
        this.app.route("/blogs").post([JWT.checkIfLoggedIn, BlogController.createBlog])
        this.app.route("/blogs/:id").put([JWT.checkIfLoggedIn, BlogController.updateBlog])
        this.app.route("/blogs/:id").delete([JWT.checkIfLoggedIn, BlogController.deleteBlog])


        return this.app
    }
}
