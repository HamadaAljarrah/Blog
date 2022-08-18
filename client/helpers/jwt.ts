import { SERVER_URL } from "../variables";

type Congfig = {
    path: string,
    method?: string,
    data?: any,
}

export const setWithExpiry = (key: string, value: any, exp: number): void => {
    const now = new Date()
    const item = {
        value: value,
        expiry: now.getTime() + exp,
    }
    localStorage.setItem(key, JSON.stringify(item))
}

export const getWithExpiry = (key: string): any => {
    const itemStr = localStorage.getItem(key)
    if (!itemStr) return null

    const item = JSON.parse(itemStr)
    const now = new Date()
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key)
        return null
    }
    return item.value
}

export const sendRequsetWithToken = async (congig: Congfig, callback?: any): Promise<any> => {

    const token = getWithExpiry("token");
    const response = await fetch(SERVER_URL + congig.path, {
        method: congig.method || "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(congig.data) || null,
    })
    const result = await response.json()
    return callback(result)
}


