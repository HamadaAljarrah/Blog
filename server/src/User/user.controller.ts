import { Response } from "express"
import { validateRegister } from "../Auth/auth.service";
import { UserReq } from "./user.interface";
import { getAllUsers, getUser, findUserById, removeUser, updateUser } from "./user.service"


class UserController {
    constructor() { }

    async getUsers(req: UserReq, res: Response) {

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

    async readUser(req: UserReq, res: Response) {

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

    async updateUser(req: UserReq, res: Response) {

        try {

            const { id } = req.params;
            const user = await findUserById(id)

            if (user === null) {
                return res.status(404).json({
                    success: false,
                    message: "User was not found"
                })
            }

            const valResult = await validateRegister(req.body);

            if (!valResult.success) {
                return res.status(valResult.status).json({
                    success: false,
                    message: valResult.message
                })
            }

            const { name, email, password } = req.body;
            const updated = { name, email, password }
            const updatedUser = await updateUser(id, updated)

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

    async deleteUser(req: UserReq, res: Response) {
        try {

            const { id } = req.params;
            const user = await findUserById(id)

            if (user === null) {
                return res.status(404).json({
                    success: false,
                    message: "User was not found"
                })
            }


            const deletedUser = await removeUser(id)

            if (deletedUser == null) {
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