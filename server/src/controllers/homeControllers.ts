import express from "express"
import { Request, Response, NextFunction } from "express"
import { CRUD } from "../interfaces";

export class HomeController implements CRUD {
    public router = express.Router();
    private basePath = "/";

    constructor() {
        this.initRoutes()
    }

    initRoutes() {
        this.router.get(this.basePath, this.read());
        this.router.post(this.basePath, this.create());
        this.router.put(this.basePath, this.update());
        this.router.delete(this.basePath, this.delete());

    }

    read() {
        return (req: Request, res: Response, next: NextFunction) => {
            res.render("index.ejs")
        }
    }

    create() {
        return (req: Request, res: Response, next: NextFunction) => {
            res.json({ message: "Creating information for the home page" })
        }
    }

    update() {
        return (req: Request, res: Response, next: NextFunction) => {
            res.json({ message: "Updating information for the home page" })
        }
    }

    delete() {
        return (req: Request, res: Response, next: NextFunction) => {
            res.json({ message: "Deleting information for the home page" })
        }
    }

}