import { Request } from "express";
import { MongoId } from "../Common/services/mongoose.services";
import { UserDocument } from "./user.model";


export interface IUser {
    name: UserDocument["name"];
    email: UserDocument["email"];
    password: UserDocument["password"];
    id?: UserDocument["_id"];
}



export interface UserReq extends Request<{ id: UserDocument['_id'] }, any, IUser> {
    userId?: MongoId
    user?: Omit<IUser, 'password'>
};
// export interface UserGetReq extends Request<{ id: UserDocument['_id'] }> { };
// export interface UserDeleteReq extends Request<{ id: UserDocument['_id'] }> { };
// export interface UserPutReq extends Request<{ id: UserDocument['_id'] }, any, IUser> { };
