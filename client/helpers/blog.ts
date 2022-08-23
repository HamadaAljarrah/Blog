import { BlogData } from "../pages/blogs/create";
import { SERVER_URL } from "../variables";
import { getWithExpiry } from "./jwt";

export const sendCreateBlogRequset = async (data: BlogData): Promise<any> => {
    const token = getWithExpiry("token");

    const response = await fetch(SERVER_URL + '/blogs', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    const result = await response.json()
    return result
}

export const uploadIamge = async (image: Blob): Promise<any> => {
    const token = getWithExpiry("token");
    const formData = new FormData();
    formData.append('image', image, ("img-" + Date.now().toString()));

    await fetch(SERVER_URL + "/blogs/upload-image", {
        mode: "no-cors",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: formData
    })

}
