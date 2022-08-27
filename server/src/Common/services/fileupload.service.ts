// import { Response } from "express";
// import { BlogReq } from "../../Blog/blog.interface";

// class FileUploader {
//     constructor() {

//     }
//     upload() {

//     }

// }

// function test() {
//     app.post("/blogs/upload-img", async (req:BlogReq , res: Response) => {
//         try {

//             console.log(req.body);
            
//             if (!req.files) {
//                 return res.json({
//                     status: false,
//                     message: "No file was attached"
//                 });
//             }

//             let img = req.files.img;
//             img.mv("./uploads/" + img.name);
//             res.json({
//                 success: true,
//                 message: "file successfully uploaded",
//                 data: {
//                     name: img.name,
//                     mimetype: img.mimetype,
//                     path: "./uploads/" + img.name,
//                     size: img.size,
//                 }
//             })
//         } catch (error) {
//             res.json({
//                 success: false,
//                 message: error
//             })
//         }

//     })
// }