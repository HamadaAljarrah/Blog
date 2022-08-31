import Token from "../../Auth/auth.model";



export const checkIfTokenValid = async(token: string): Promise<boolean> =>{
    const tokenIsValid = await Token.findOne({token});
    if(tokenIsValid == null) {
        return true;
    }
    return false;
} 