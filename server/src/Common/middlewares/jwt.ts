import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken"
import { UserReq } from "../../User/user.interface";
import { checkIfTokenValid } from "../services/token.service";

const secret = process.env.ACCESS_TOKEN || ""
class JWT {

    async checkIfLoggedIn(req: UserReq, res: Response, next: NextFunction) {

        const authHeader = req.headers.authorization
        if (authHeader && authHeader !== "null") {

            const token = authHeader.split(" ")[1];
            
            const isTokenValid = await checkIfTokenValid(token);
            if (!isTokenValid) {
                return res.status(403).json({ success: false, message: "unauthorized" })
            }

            jwt.verify(token, secret, (err: any, deconded: any) => {

                if (err) {
                    return res.status(403).json({
                        success: false,
                        message: "Token Expired"
                    })
                }
                req.user = deconded.user;
                next()
            })

        } else {

            res.status(403).json({ success: false, message: "unauthorized" })

        }
    }
}

export default new JWT