import dotenv from "dotenv"
if (process.env.NODE_ENV !== "production") { dotenv.config() }
import express from "express"
import cors from "cors"


import { App } from "./App"
import { RouteConfig } from "./Common/RouteConfig";

import { AuthRoutes } from "./Auth/auth.router.config";
import { BlogRoutes } from "./Blog/blog.router.config";
import { UserRoutes } from "./User/user.router.config";


const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.static('Public'))
app.use(express.json())
app.use(cors())

const routes: Array<RouteConfig> = [
    new UserRoutes(app),
    new AuthRoutes(app),
    new BlogRoutes(app),
]



const server = new App({
    port: 4000,
    app: app,
    routes: routes
})
server.listen();


//Upload and retrieve image, TODO: abstracttion

// import multer from "multer"
// import path from "path"
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './Public')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     },
// })
// const upload = multer({ storage: storage })

// app.post("/blogs/upload-image", upload.single("image"), (req, res) => {
//     try {
//         console.log(req.body);

//         res.json({ message: "Go" })
//     } catch (error) {
//         console.log(error);

//     }

// })

// app.get('/fetchImage/:file', (req, res) => {
//     let file = req.params.file;
//     let fileLocation = path.join(__dirname, "..", 'Public', file);
//     res.sendFile(fileLocation);
// })




