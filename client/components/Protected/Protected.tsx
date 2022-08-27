import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { useProtect } from '../../hook/useProtect';

type Props = {
    children: ReactNode
}

export const Protected = ({ children }: Props): any => {
    const { isLoading, isError } = useProtect();
    const router = useRouter();

    if (isLoading) return <div>Loading...</div>
    if (isError) {
        router.push("/auth/login")
        return <div>Loading...</div>
    }
    return children

}
