import express from "express"


export class App {
    public app: express.Application;
    private port: number;

    constructor(appInit: { port: number, controllers: Array<any>, middlewares: Array<any>, configs: Array<any> }) {
        this.app = express();
        this.port = appInit.port;
        this.configs(appInit.configs)
        this.middlewares(appInit.middlewares)
        this.controllers(appInit.controllers)
    }

    private middlewares(middlewares: any[]) {
        middlewares.forEach(middleware => {
            this.app.use(middleware.path ? middleware.path : "/", middleware.func)
        })
    }

    private controllers(controllers: any[]) {
        controllers.forEach(controller => {
            this.app.use(controller.router)
        })
    }
    private configs(configs: any[]) {
        configs.forEach(config => {
            this.app.set(config.name, config.value)
        })
    }

    public listen() {
        this.app.listen(this.port, () => console.log("Listning to port: *" + this.port))
    }

}