import { Document, Schema } from "mongoose";
import mongooseServices from "../Common/services/mongoose.services";


export interface TokenDocument extends Document {
    token: string;
}
const TokenSchema = new Schema({
    token: { type: String, required: true },
})

const Token = mongooseServices.getInstance().model<TokenDocument>("Token", TokenSchema)
export default Token