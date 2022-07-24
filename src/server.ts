import express from "express"
import { App } from "./app";
import { HomeController } from "./controllers/homeController";
import { UserController } from "./controllers/userController";
import { verifyToken } from "./middlewares/verifyToken";



const app = new App({
    port: 3000,
    middlewares: [
        { func: express.urlencoded({ extended: false }) },
        { func: express.json() },
        { func: verifyToken, path: "/user" },
    ],
    controllers: [
        new HomeController(),
        new UserController(),
    ],
});

app.listen()