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
        this.app.route("/users/:id").get([UserController.readUser])
        this.app.route("/users/:id").put([JWT.checkIfLoggedIn, UserController.updateUser])
        this.app.route("/users/:id").delete([JWT.checkIfLoggedIn, UserController.deleteUser])

        return this.app
    }
}