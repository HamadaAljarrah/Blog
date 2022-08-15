import { Application } from "express"
import { RouteConfig } from "../Common/RouteConfig";
import JWT from "../Common/middlewares/jwt"
import UserController from "./user.controller"

export class UserRoutes extends RouteConfig {

    constructor(app: Application) {
        super(app, "UserRoutes")
    }

    configureRoutes(): Application {

        this.app.route("/users").get([UserController.getUsers])
        this.app.route("/user").get([JWT.checkIfLoggedIn, UserController.getCurrentUser])
        this.app.route("/users/:id").get([UserController.readUser])
        this.app.route("/users/:id").put([UserController.updateUser])
        this.app.route("/users/:id").delete([UserController.deleteUser])

        return this.app
    }
}