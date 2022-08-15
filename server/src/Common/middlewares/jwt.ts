import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken"
import { UserReq } from "../../User/user.interface";

const secret = process.env.ACCESS_TOKEN || ""
class JWT {

    checkIfLoggedIn(req: UserReq, res: Response, next: NextFunction) {

        const authHeader = req.headers.authorization
        if (authHeader && authHeader !== "null") {

            const token = authHeader.split(" ")[1];
            jwt.verify(token, secret, (err: any, user: any) => {

                if (err) {
                    return res.status(403).json({
                        success: false,
                        message: "Token Expired"
                    })
                }
                req.userId = user.id;
                next()
            })

        } else {

            res.status(403).json({ success: false, message: "unauthorized" })

        }
    }
}

export default new JWT