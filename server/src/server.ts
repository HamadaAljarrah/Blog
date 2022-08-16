import dotenv from "dotenv"
if (process.env.NODE_ENV !== "production") { dotenv.config() }
import express from "express"
import cors from "cors"

import { App } from "./App"
import { RouteConfig } from "./Common/RouteConfig";

import { AuthRoutes } from "./Auth/auth.router.config";
import { BlogRoutes } from "./Blog/blog.router.config";
import { UserRoutes } from "./User/user.router.config";


const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

const routes: Array<RouteConfig> = [
    new UserRoutes(app),
    new AuthRoutes(app),
    new BlogRoutes(app)
]


const server = new App({
    port: 4000,
    app: app,
    routes: routes
})
server.listen();