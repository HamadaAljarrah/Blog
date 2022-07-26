import express, { Application } from "express"

export abstract class RouteConfig {
    app: express.Application;
    name: string;
    constructor(app: Application, name: string) {
        this.app = app;
        this.name = name;
    }
    getName() {
        return this.name
    }

    abstract configureRoutes(): Application
}