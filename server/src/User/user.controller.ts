import { Response } from "express"
import { IUserGetReq, IUserPutReq, IUserDeleteReq, IUserPostReq } from "./user.interface";
import { getAllUsers, getUser, validateBody, createNewUser } from "./user.service"

class UserController {
    constructor() { }
    async getUsers(req: IUserGetReq, res: Response) {
        const users = await getAllUsers();
        res.status(200).json({
            success: true,
            message: "All users sent successfully",
            data: users
        })
    }

    async readUser(req: IUserGetReq, res: Response) {
        const { id } = req.params
        const user = await getUser(id);
        if (user instanceof Error) {
            return res.json({
                success: false,
                message: user.message,
            })
        }
        res.json({
            success: true,
            message: "User was found",
            data: user
        })
    }

    //this method will be in auth class
    async createUser(req: IUserPostReq, res: Response) {
        const valResult = await validateBody(req.body);
        if (!valResult.success) {
            return res.status(valResult.status).json({
                success: false,
                message: valResult.message
            })
        }
        const { name, email, password } = req.body;
        const UserResult = await createNewUser({ name, email, password });
        res.status(UserResult.status).json({
            success: UserResult.success,
            message: UserResult.message,
        })
    }

    async updateUser(req: IUserPutReq, res: Response) {

    }

    async deleteUser(req: IUserDeleteReq, res: Response) {

    }

}
export default new UserController