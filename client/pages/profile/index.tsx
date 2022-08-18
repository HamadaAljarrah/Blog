import React, { useEffect, useLayoutEffect, useState } from 'react'
import Container from '../../layouts/Container/Container'
import classes from "./profile.module.scss"
import { useTheme } from '../../context/them.context'
import { sendRequsetWithToken } from '../../helpers/jwt'
import { User } from '../../types/user'
import { NextPage } from 'next'
import Router from 'next/router'
import { Protected } from '../../components/Protected/Protected'




const Profile: NextPage = (): JSX.Element => {

    const { theme } = useTheme();

    const [loading, setLoading] = useState<boolean>(true)
    const [user, setUser] = useState<User>()
    const [error, setError] = useState<any>()

    const getData = () => {
        sendRequsetWithToken({ path: "/user" }, (result: any) => {
            if (!result.success) {
                setError(result.message)
                return Router.push("/auth/login")
            }
            setUser(result.data)
            setLoading(false)
            setError(null)

        })
    }

    useLayoutEffect(() => { getData() }, [])

    return (
        <Protected isError={error} isLoading={loading} >
            <Container>
                <div className={`${classes.container} ${classes[theme]}`}>
                    <h1>Profile</h1>
                    <div>
                        {user && <>
                            <p><strong>Name: </strong>{user.name}</p>
                            <p><strong>Email: </strong>{user.email}</p>
                            <p><strong>ID: </strong>{user._id}</p>
                        </>}
                    </div>
                    <button>Logout</button>
                </div>
            </Container>
        </Protected>

    )
}

export default Profile

