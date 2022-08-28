import { Response } from "express";
import { UserReq } from "../User/user.interface";
import { createNewUser, generateAccessToken, validateLogin, validateRegister } from "./auth.service";
import { IUser } from "../User/user.interface"


class AuthController {
    constructor() { }

    async login(req: UserReq, res: Response) {

        try {

            const valResult = await validateLogin(req.body);

            if (!valResult.success) {
                return res.status(valResult.status).json({
                    success: valResult.success,
                    message: valResult.message
                })
            }

            const token = generateAccessToken({ user: await valResult.data, }, "15m")

            return res.status(200).json({
                success: true,
                message: "You are logged in",
                token: token
            })


        } catch (error) {

            res.status(400).json({
                success: false,
                message: error,
            })

        }

    }

    async register(req: UserReq, res: Response) {

        try {

            const valResult = await validateRegister(req.body);

            if (!valResult.success) {
                return res.status(valResult.status).json({
                    success: false,
                    message: valResult.message
                })
            }

            const { name, email, password } = req.body;
            const data: IUser = { name, email, password }
            const UserResult = await createNewUser(data);

            res.status(UserResult.status).json({
                success: UserResult.success,
                message: UserResult.message,
            })

        } catch (error) {

            res.status(400).json({
                success: false,
                message: error,
            })

        }
    }
    async logout(req: UserReq, res: Response) {
        try {
            //get current token by a milddleware
            //set ths token in a balck list and store it in database
            //in jwt check frist if the token exist in the black list

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error,
            })
        }
    }
}

export default new AuthController