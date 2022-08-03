import express from "express"
import { RouteConfig } from "./Common/RouteConfig";


export class App {
    app: express.Application;
    port: number;
    routes: Array<RouteConfig>;

    constructor(appConfig: { port: number, app: express.Application, routes: Array<RouteConfig> }) {
        this.app = appConfig.app;
        this.port = appConfig.port;
        this.routes = appConfig.routes
        this.initRoutes()
    }



    private initRoutes() {
        this.routes.forEach(route => {
            route.configureRoutes()
            console.log(`Routes configured for ${route.getName()}`)
        })
    }

    public listen() {
        this.app.listen(this.port, () => console.log("Listning to port: *" + this.port))
    }

}