import { NextFunction, Response } from "express";

class JWT {
    checkIfLoggedIn(req: any, res: Response, next: NextFunction) {
        if (req.body.email) {
            return next()
        }
        console.log(req.body);

        res.json({ message: "Loggin to access" })
    }
}

export default new JWT