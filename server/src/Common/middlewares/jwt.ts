import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken"
import { UserPostReq } from "../../User/user.interface";

const secret = process.env.ACCESS_TOKEN || ""
class JWT {

    checkIfLoggedIn(req: UserPostReq, res: Response, next: NextFunction) {

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
                req.user = user
                next()
            })

        } else {

            res.status(403).json({ success: false, message: "Login to access" })

        }
    }
}

export default new JWT