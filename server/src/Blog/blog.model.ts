import { Document, Schema } from "mongoose";
import mongooseServices from "../Common/services/mongoose.services";


export interface BlogDocument extends Document {
    title: string;
    snippet: string;
    content: string;
    auther: string;
    autherId: string;
    category: string;
    readTime: number;
    createAt: string;
    edited?: string
}

const BlogSchema = new Schema({
    title: { type: String, required: true },
    snippet: { type: String, required: true },
    content: { type: String, required: true },
    auther: { type: String, required: true },
    autherId: { type: String, required: true },
    category: { type: String, required: true }, // enum?
    readTime: { type: Number, required: true },
    createAt: { type: String, required: true },
    
    edited: { type: String }
})




const Blog = mongooseServices.getInstance().model<BlogDocument>("Blog", BlogSchema)
export default Blog