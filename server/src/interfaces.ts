import mongoose from "mongoose";


export interface CRUD {
    create(): any;
    read(): any;
    update(): any;
    delete(): any;
}

export interface IUser extends mongoose.Document {
    id: string;
    name: string;
    email: string;
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
    generateAccessToken(exp: string): string;
    generateRefreshToken(exp: string): string;

}

export interface IBlog extends mongoose.Document {
    title: string;
    snippet: string;
    body: string;
    auther: string;
    category: string;
    readTime: number;
    date: Date;
    edited?: Date;
}

export interface IPayload {
    id: string;
    email: string;
}

