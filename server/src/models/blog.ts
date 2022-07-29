import mongoose from "mongoose"
import { IBlog } from "../interfaces"

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    auther: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    readTime: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    edited: {
        type: Date,
    }
})


export const Blog = mongoose.model<IBlog>("Blog", blogSchema)