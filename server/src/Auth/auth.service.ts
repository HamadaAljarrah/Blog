import User from "../User/user.model";
import { IUser } from "../User/user.interface";
import { ICheckResponse } from "../Common/interfaces";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const validateLogin = async (body: IUser): Promise<ICheckResponse> => {

    if (!(body.email && body.password))
        return {
            status: 401,
            success: false,
            message: "All fields required"
        }

    const userExist = await User.findOne({ email: body.email });
    if (userExist == null)
        return {
            status: 409,
            success: false,
            message: "User with this email does not exist"
        }


    const isMatch = await bcrypt.compare(body.password, userExist.password)
    if (!isMatch) {
        return {
            status: 403,
            success: false,
            message: "Wrong password"
        }
    }

    return {
        status: 200,
        success: true,
        message: "Valid body",
        data: userExist
    }

}


export const validateRegister = async (body: IUser): Promise<ICheckResponse> => {

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


export const generateAccessToken = (payload: object, exp: string): string => {

    let secret = process.env.ACCESS_TOKEN || "123123"
    return jwt.sign(payload, secret, { expiresIn: exp })
}


export const generateRefreshToken = (payload: object, exp: string): string => {
    let secret = process.env.REFRESH_TOKEN || "123123";
    return jwt.sign(payload, secret, { expiresIn: exp })

}
