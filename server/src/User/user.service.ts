import { IUser } from "./user.interface";
import User from "./user.model";
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

export const findUserById = async (id: MongoId): Promise<IUser | null> => await User.findById(id)
export const updateUser = async (id: MongoId, updated: IUser): Promise<IUser | null> => await User.findOneAndUpdate({ _id: id }, updated);
export const removeUser = async (id: MongoId): Promise<IUser | null> => await User.findOneAndDelete({ _id: id });

