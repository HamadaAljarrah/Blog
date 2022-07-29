import mongoose from "mongoose"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
if (process.env.NODE_ENV !== "production") {
    dotenv.config()
}
import { IUser } from "../interfaces"


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    },
    accessToken: {
        type: String
    },
})

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const validPassword = await bcrypt.compare(candidatePassword, this.password)
    if (validPassword)
        return true
    return false
};
userSchema.methods.generateAccessToken = function (exp: string): string {
    let token = "";
    if (process.env.ACCESS_TOKEN) {
        token = jwt.sign({ id: this._id, email: this.email }, process.env.ACCESS_TOKEN, { expiresIn: exp })
    }
    return token
};

userSchema.methods.generateRefreshToken = function (exp: string): string {
    let token = "";
    if (process.env.REFRESH_TOKEN) {
        token = jwt.sign({ id: this._id, email: this.email }, process.env.REFRESH_TOKEN, { expiresIn: exp })
    }
    return token
};



userSchema.pre("save", async function (next) {
    const User = this;
    if (User.isModified("password")) {
        User.password = await bcrypt.hash(User.password, 10);
    }
    next();
})



export const User = mongoose.model<IUser>("user", userSchema);

