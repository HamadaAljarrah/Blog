import { Application } from "express"
import { RouteConfig } from "../Common/RouteConfig";
import JWT from "../Common/middlewares/jwt"
import UserController from "./user.controller"

export class UserRoutes extends RouteConfig {
    constructor(app: Application) {
        super(app, "UserRoutes")
    }
    configureRoutes(): Application {
        this.app.route("/users").get([JWT.checkIfLoggedIn, UserController.getUsers])
        this.app.route("/users/:id").get([JWT.checkIfLoggedIn, UserController.readUser])
        this.app.route("/users").post([UserController.createUser])

        return this.app
    }
}