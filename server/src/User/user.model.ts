import { Document, Schema } from "mongoose";
import MongooseService from "../Common/services/mongoose.services";
import bcrypt from "bcrypt"

export interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
}


const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.password;
            }
        }
    }
)



UserSchema.pre("save", async function (next) {
    const User = this
    if (User.isModified("password")) {
        User.password = await bcrypt.hash(User.password, 10);
    }
    next()
})

const User = MongooseService.getInstance().model<UserDocument>("User", UserSchema);
export default User