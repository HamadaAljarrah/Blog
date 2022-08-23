import { SERVER_URL } from "../variables";

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
