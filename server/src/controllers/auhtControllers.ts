import express from "express"
import { Request, Response, NextFunction } from "express"
import { User } from "../models/user";
import { connectToMongo } from "../helpers/db";

export class AuthController {
    private router = express.Router();
    private basePath = "/auth";

    constructor() {
        this.initRoutes()
    }

    private initRoutes() {
        this.router.post(`${this.basePath}/register`, this.register());
        this.router.post(`${this.basePath}/login`, this.login());
        this.router.post(`${this.basePath}/logout`, this.logout());
    }


    private register(): any {
        return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
            try {
                //extract data from body
                const { name, email, password } = req.body;

                //validate input
                if (!(name && email && password))
                    return res.status(401) //invalid cridentials
                        .json({ success: false, message: "All fields required" })

                //check if user exist
                connectToMongo()
                const userExist = await User.findOne({ email });
                if (userExist != null)
                    return res.status(409) //conflict
                        .json({ success: false, message: "User with this email already exist" })

                //create the user
                const newUser = new User({ name, email, password })
                newUser.save()
                return res.status(200) //ok
                    .json({ success: true, message: "User was registred" })
            } catch (error) {
                console.log(error);
                return res.status(500)
                    .json({ success: false, message: "server error occurred" })
            }
        }
    }

    private login(): any {
        return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
            //get data from body
            const { email, password } = req.body;

            //validate input
            if (!(email && password))
                return res.status(401) //invalid cridentials
                    .json({ success: false, message: "All fields required" })

            try {
                //check if user exist
                connectToMongo()
                const userExist = await User.findOne({ email });
                if (userExist == null) {
                    return res.status(401) //invalid cridentials
                        .json({ success: false, message: "There is no user registred with email" })
                }
                //check if valid password
                const isValid = userExist.comparePassword(password)
                if (!isValid) {
                    return res.status(401) //invalid cridentials
                        .json({ success: false, message: "Wrong password" })
                }
                //create token and store it in a cookie
                const accessToken = userExist.generateAccessToken("15m")
                const refreshToken = userExist.generateRefreshToken("2h") //for more secure authentication, not implemented yet
                res.cookie("jwt", accessToken, { httpOnly: true })
                return res.status(200) //ok
                    .json({ success: true, message: "Login succeeded", accessToken, refreshToken })
            } catch (error) {
                console.log(error);
                return res.status(500)
                    .json({ success: false, message: "server error occurred" })

            }
        }
    }

    private logout(): any {
        return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
            try {
                //replace jwt cookie with an empty one that last 1 ms
                //note: token is still valid until expiration
                res.cookie("jwt", "", { maxAge: 1, httpOnly: true })
                return res.status(200)
                    .json({ success: true, message: "Logout succeeded" })
            } catch (error) {
                console.log(error);
                return res.status(500)
                    .json({ success: false, message: "server error occurred" })
            }
        }
    }
}