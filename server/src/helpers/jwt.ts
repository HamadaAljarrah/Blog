import jwt from "jsonwebtoken"
import { IPayload } from "../interfaces";

export function createAccessToken(payload: IPayload, exp: string): string {
    let secret = process.env.ACCESS_TOKEN;
    if (secret) {
        const accessToken = jwt.sign(payload, secret, { expiresIn: exp })
        return accessToken
    }
    return ""
}

export function createRefreshToken(payload: IPayload, exp: string): string {
    let secret = process.env.REFRESH_TOKEN;
    if (secret) {
        const refreshToken = jwt.sign(payload, secret, { expiresIn: exp })
        return refreshToken
    }
    return ""
}

export function decodeToken(token: string, secret: string): IPayload {
    const decoded = jwt.verify(token, secret) as IPayload;
    return decoded
}