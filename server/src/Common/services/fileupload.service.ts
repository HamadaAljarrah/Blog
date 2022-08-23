
class FileUploader {
    constructor() {

    }
    upload() {

    }

}

function test() {
    app.post("/upload-img", async (req, res) => {
        try {

            if (!req.files) {
                return res.json({
                    status: false,
                    message: "No file was attached"
                });
            }

            let img = req.files.img;
            img.mv("./uploads/" + img.name);
            res.json({
                success: true,
                message: "file successfully uploaded",
                data: {
                    name: img.name,
                    mimetype: img.mimetype,
                    path: "./uploads/" + img.name,
                    size: img.size,
                }
            })
        } catch (error) {
            res.json({
                success: false,
                message: error
            })
        }

    })
}