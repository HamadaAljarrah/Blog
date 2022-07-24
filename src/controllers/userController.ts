import express from "express"
import { Request, Response, NextFunction } from "express"
import { CRUD } from "../interfaces";

export class UserController implements CRUD {
    public router = express.Router();
    private basePath = "/user";

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
            res.json({ message: "Reading information for the user" })
        }
    }

    create() {
        return (req: Request, res: Response, next: NextFunction) => {
            res.json({ message: "Creating information for the user" })
        }
    }

    update() {
        return (req: Request, res: Response, next: NextFunction) => {
            res.json({ message: "Updating information for the user" })
        }
    }

    delete() {
        return (req: Request, res: Response, next: NextFunction) => {
            res.json({ message: "Deleting information for the user" })
        }
    }

}