import { IUser } from "./user.interface";
import User from "./user.model";
import { ICheckResponse } from "../Common/interfaces";
import { MongoId } from "../Common/services/mongoose.services";



export const getAllUsers = async (): Promise<Array<IUser> | Error> => {

    const users: Array<IUser> = await User.find()
    if (users == null) return new Error("Faild to get users")
    return users

}


export const getUser = async (id: MongoId): Promise<IUser | Error> => {

    const user = await User.findById({ _id: id })
    if (user == null) {
        return new Error('User was not found')
    }
    return user

}


export const validateBody = async (body: IUser): Promise<ICheckResponse> => {

    if (!(body.name && body.email && body.password))
        return {
            status: 401,
            success: false,
            message: "All fields required"
        }

    if (body.password.length < 6)
        return {
            status: 401,
            success: false,
            message: "Password must be at least 6 charcaters long"
        }

    const userExist = await User.findOne({ email: body.email });
    if (userExist)
        return {
            status: 409,
            success: false,
            message: "User with this email already exist"
        }

    return {
        status: 200,
        success: true,
        message: "Valid body"
    }

}

export const createNewUser = async (data: IUser) => {

    const newUser = new User(data)
    await newUser.save()

    return {
        status: 200,
        success: true,
        message: "User was created"
    }

}
