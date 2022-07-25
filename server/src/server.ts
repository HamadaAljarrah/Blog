import express from "express"
import { App } from "./app";
import { HomeController } from "./controllers/homeController";
import { AuthController } from "./controllers/auhtControllers";
import { verifyToken } from "./middlewares/verifyToken";



const app = new App({
    port: 4000,
    middlewares: [
        { func: express.urlencoded({ extended: false }) },
        { func: express.json() },
        { func: verifyToken, path: "/token" },
    ],
    controllers: [
        new HomeController(),
        new AuthController(),
    ],
    configs: []
});


app.listen()