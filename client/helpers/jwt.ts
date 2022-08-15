import jwt from "jsonwebtoken"


const secret = process.env.NEXT_PUBLIC_ACCESS_TOKEN || "123";

export const decode = (token: string) => {
    return jwt.verify(token, secret)
}