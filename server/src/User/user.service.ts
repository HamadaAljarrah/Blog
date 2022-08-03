import { IUser } from "./user.interface";
import { UserDocument } from "./user.model";
import User from "./user.model";

export async function getAllUsers(): Promise<Array<IUser>> {
    return await User.find()
}

export async function getUser(id: string): Promise<UserDocument | Error> {
    const user = await User.findById({ _id: id })
    if (user) {
        return user
    }
    return new Error('User was not found')
}

export async function validateBody(body: IUser) {
    //all field is included
    if (!(body.name && body.email && body.password))
        return { status: 401, success: false, message: "All fields required" }

    //password length
    if (body.password.length < 6)
        return { status: 401, success: false, message: "Password must be at least 6 charcaters long" }

    //check if user exist
    const userExist = await User.findOne({ email: body.email });
    if (userExist != null)
        return { status: 409, success: false, message: "User with this email already exist" }

    return { status: 200, success: true, message: "Valid body" }

}
export async function createNewUser(data: any) {
    try {
        await User.create(data)
        return { status: 200, success: true, message: "User was created" }
    } catch (error) {
        return { status: 500, success: true, message: error }
    }


}