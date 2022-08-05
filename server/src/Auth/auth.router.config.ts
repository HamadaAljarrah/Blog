import { Application } from "express";
import { RouteConfig } from "../Common/RouteConfig";
import AuthController from "./auth.controller"

export class AuthRoutes extends RouteConfig {

    constructor(app: Application) {
        super(app, "AuthRouter")
    }

    configureRoutes(): Application {

        this.app.route("/auth/login").post([AuthController.login])
        this.app.route("/auth/register").post([AuthController.register])

        return this.app
    }
}