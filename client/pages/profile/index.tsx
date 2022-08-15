import React, { useEffect, useState } from 'react'
import Container from '../../layouts/Container/Container'
import classes from "./profile.module.scss"
import { useTheme } from '../../context/them.context'
import { SERVER_URL } from '../../variables'


const Profile = () => {
    const [user, setUser] = useState<{ name: string, email: string, _id: string }>()
    const { theme } = useTheme();



    useEffect(() => {
        const getData = async () => {
            const token = localStorage.getItem("token");
            const response = await fetch(SERVER_URL + "/user", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const result = await response.json()
            setUser(result.data)
        }
        getData();
    }, [])


    return (
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
    )
}

export default Profile

