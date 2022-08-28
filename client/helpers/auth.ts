import { User } from "../types/user";
import { SERVER_URL } from "../variables";


type CheckRes<T> = {
    success: boolean,
    message: string,
    data?: T
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


export const logOut = ()=>{
    //TODO: send logout requset to backend
    localStorage.removeItem('token')
}

export const sendAuthRequest = async (requsetType: 'login' | 'register', data: any): Promise<any> => {
    let url: string;
    requsetType === 'login' ? url = SERVER_URL + '/auth/login' : url = SERVER_URL + '/auth/register'
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    const result = await response.json();
    return result

}

export const checkIfLoggedin = async (token: string): Promise<CheckRes<User>>  => {
    const url = SERVER_URL + '/user';
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    const result = await response.json();
    return result
}
