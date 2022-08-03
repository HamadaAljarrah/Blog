import { Request } from "express";
import { UserDocument } from "./user.model";

export interface IUser extends UserDocument {
    id: string;
}
export interface IUserPostReq extends Request<{}, {}, IUser> { };
export interface IUserGetReq extends Request<{ id: IUser['id'] }> { };
export interface IUserDeleteReq extends Request<{ id: IUser['id'] }> { };
export interface IUserPutReq extends Request<{ id: IUser['id'] }, any, IUser> { };
