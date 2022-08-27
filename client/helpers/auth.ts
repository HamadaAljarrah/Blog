import { User } from "../types/user";
import { SERVER_URL } from "../variables";


type CheckRes<T> = {
    success: boolean,
    message: string,
    data?: T
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
