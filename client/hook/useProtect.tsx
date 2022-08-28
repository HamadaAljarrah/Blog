import { useEffect, useState } from "react";
import { checkIfLoggedin } from "../helpers/auth"
import { getWithExpiry } from "../helpers/auth";
import { User } from "../types/user";


export const useProtect = () => {
    const [isLoading, setIsloading] = useState<boolean>(true);
    const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
    const [isError, setIsError] = useState<any>();
    const [user, setUser] = useState<User | undefined>();


    useEffect(() => {
        const check = async () => {
            const token = getWithExpiry('token')
            const result = await checkIfLoggedin(token)
            if (result.success) {
                setIsloading(false);
                setIsError(null)
                setIsLoggedin(true)
                setUser(result.data)
            }
            if (!result.success) {
                setIsloading(false);
                setIsError(result.message)
                setIsLoggedin(false)
                setUser(undefined)
            }
        }
        check()
    }, [])

    return {isLoading, isError, user, isLoggedin, setIsLoggedin}
}