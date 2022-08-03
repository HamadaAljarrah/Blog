import mongoose from "mongoose";

class MongooseService {
    private numOfRetries = 0
    private mongooseOption = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        serverSelectionTimeoutMS: 3000,
        useFindAndModify: false,
    }
    constructor() {
        this.connect()
    }

    public getInstance() {
        return mongoose;
    }
    public connect() {
        const URI = process.env.MONGO_URI || ""
        mongoose.connect(URI, this.mongooseOption)
            .then(() => console.log("Conntected to MongoDB"))
            .catch((err) => {
                const retrySeconds = 3
                console.log("Error occured: " + err)
                console.log(`Unsuccessed to connect to database #${++this.numOfRetries}`);
                console.log(`Server will reconnect to database in ${retrySeconds} seconds`)
                setTimeout(this.connect, retrySeconds * 1000)
            })
    }

}
export default new MongooseService()