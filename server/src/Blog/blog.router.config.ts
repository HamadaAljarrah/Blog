import { Application } from "express";
import { RouteConfig } from "../Common/RouteConfig";
import blogController from "./blog.controller";
import JWT from "../Common/middlewares/jwt";

export class BlogRoutes extends RouteConfig {
    constructor(app: Application) {
        super(app, "BlogRouter")
    }

    configureRoutes(): Application {

        this.app.route("/blogs").get([blogController.getAllBlogs])
        this.app.route("/blogs/:id").get([blogController.readBlog])
        this.app.route("/blogs").post([JWT.checkIfLoggedIn, blogController.createBlog])
        this.app.route("/blogs/:id").put([JWT.checkIfLoggedIn, blogController.updateBlog])
        this.app.route("/blogs/:id").delete([JWT.checkIfLoggedIn, blogController.deleteBlog])

        return this.app
    }
}
