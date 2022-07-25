import mongoose from "mongoose"
import dotenv from "dotenv"

if (process.env.NODE_ENV !== "production") {
    dotenv.config()
}

export const connectToMongo = async () => {
    try {
        if (process.env.MONGO_URI) {
            await mongoose.connect(process.env.MONGO_URI);
            console.log("connected to mongoDb");
        }
    } catch (error) {
        console.log(error);
    }

}