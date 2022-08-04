import { Response } from "express"
import { UserGetReq, UserPutReq, UserDeleteReq, UserPostReq } from "./user.interface";
import { getAllUsers, getUser, validateBody, createNewUser } from "./user.service"
import { IUser } from "./user.interface"
import User from "./user.model";

class UserController {
    constructor() { }

    async getUsers(req: UserGetReq, res: Response) {

        try {

            const users = await getAllUsers();

            if (!(users instanceof Error) && users.length === 0) {
                return res.status(200).json({
                    success: true,
                    message: "There is no users yet!",
                })
            }

            res.status(200).json({
                success: true,
                message: "All users sent successfully",
                data: users
            })

        } catch (error) {

            res.status(400).json({
                success: false,
                message: error,
            })

        }
    }

    async readUser(req: UserGetReq, res: Response) {

        try {

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

        } catch (error) {

            res.status(400).json({
                success: false,
                message: error,
            })

        }

    }

    //this method will be in auth class
    async createUser(req: UserPostReq, res: Response) {

        try {

            const valResult = await validateBody(req.body);

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

    async updateUser(req: UserPutReq, res: Response) {

        try {

            const { id } = req.params;
            const user = await User.findById(id)

            if (user === null) {
                return res.status(404).json({
                    success: false,
                    message: "User was not found"
                })
            }

            const valResult = await validateBody(req.body);

            if (!valResult.success) {
                return res.status(valResult.status).json({
                    success: false,
                    message: valResult.message
                })
            }

            const { name, email, password } = req.body;
            const updated = { name, email, password }
            const updatedUser = await User.findOneAndUpdate({ _id: id }, updated);

            if (updatedUser == null) {
                return res.status(500).json({
                    success: false,
                    message: "Faild to update user",
                })
            }

            return res.status(200).json({
                success: true,
                message: "User was updated",
            })

        } catch (error) {

            res.status(400).json({
                success: false,
                message: error,
            })

        }


    }

    async deleteUser(req: UserDeleteReq, res: Response) {
        try {

            const { id } = req.params;
            const user = await User.findById(id)

            if (user === null) {
                return res.status(404).json({
                    success: false,
                    message: "User was not found"
                })
            }


            const deleteUser = await User.findOneAndDelete({ _id: id });

            if (deleteUser == null) {
                return res.status(500).json({
                    success: false,
                    message: "Faild to delete user",
                })
            }

            return res.status(200).json({
                success: true,
                message: "User was deleted",
            })

        } catch (error) {

            res.status(400).json({
                success: false,
                message: error,
            })

        }

    }

}
export default new UserController