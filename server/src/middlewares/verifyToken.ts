import { Request, Response, NextFunction } from "express"

export function verifyToken(req: Request, res: Response, next: NextFunction): void {
    console.log(req.headers.authorization);

    req.body.token ? next() : res.json({ message: "Login to access" })
}