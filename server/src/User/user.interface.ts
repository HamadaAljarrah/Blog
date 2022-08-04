import { Request } from "express";
import { UserDocument } from "./user.model";


export interface IUser {
    name: UserDocument["name"];
    email: UserDocument["email"];
    password: UserDocument["password"];
    id?: UserDocument["id"];
}



export interface UserPostReq extends Request<{}, {}, IUser> { };
export interface UserGetReq extends Request<{ id: UserDocument['_id'] }> { };
export interface UserDeleteReq extends Request<{ id: UserDocument['_id'] }> { };
export interface UserPutReq extends Request<{ id: UserDocument['_id'] }, any, IUser> { };
