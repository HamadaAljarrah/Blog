import React, { useState } from 'react'
import { SERVER_URL } from '../../variables';





const FilePage = () => {
    const [fileSelected, setFileSelected] = useState<File>()

    const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;
        if (!fileList) return;
        setFileSelected(fileList[0]);
    };

    const uploadFile = async function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        if (fileSelected) {
            const formData = new FormData();
            formData.append("image", fileSelected, ("img-" + Date.now().toString()));
            console.log(fileSelected);

            await fetch(SERVER_URL + "/test", {
                mode: "no-cors",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: formData
            })
        }
    };


    return (
        <form encType='multipart/form-data'>
            <input onChange={handleImageChange} type="file" name="file" id="file" />
            <button onClick={uploadFile} type='button'>Upload</button>
        </form>
    )
}
export default FilePage