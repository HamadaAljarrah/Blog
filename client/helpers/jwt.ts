import { SERVER_URL } from "../variables";

export const getAndSendWithToken = async (path: string, method: string, data: any, callback: any) => {
    const token = localStorage.getItem("token");
    const response = await fetch(SERVER_URL + path, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })
    const result = await response.json()
    return callback(result)
}