import dotenv from "dotenv"
if (process.env.NODE_ENV !== "production") {
    dotenv.config()
}
import express from "express"
import { App } from "./App";
import { AuthRoutes } from "./Auth/auth.router.config";
import { BlogRoutes } from "./Blog/blog.route.config";
import { RouteConfig } from "./Common/RouteConfig";
import { UserRoutes } from "./User/user.router.config";

const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const routes: Array<RouteConfig> = [
    new UserRoutes(app),
    new AuthRoutes(app),
    new BlogRoutes(app)
]

const appConfig = {
    port: 4000,
    app: app,
    routes: routes
}
const server = new App(appConfig)
server.listen();