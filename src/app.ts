import express from "express"


export class App {
    public app: express.Application;
    public port: number;

    constructor(appInit: { port: number, controllers: Array<any>, middlewares: Array<any> }) {
        this.app = express();
        this.port = appInit.port;
        this.middlewares(appInit.middlewares)
        this.controllers(appInit.controllers)
    }

    middlewares(middlewares: any[]) {
        middlewares.forEach(middleware => {
            this.app.use(middleware.path ? middleware.path : "/", middleware.func)
        })
    }

    controllers(controllers: any[]) {
        controllers.forEach(controller => {
            this.app.use(controller.router)
        })
    }

    listen() {
        this.app.listen(this.port, () => console.log("Listning to port: *" + this.port))
    }

}