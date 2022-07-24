import { Request, Response, NextFunction } from "express"

export function verifyToken(req: Request, res: Response, next: NextFunction): void {
    req.body.token ? next() : res.json({ message: "Login to access" })
}