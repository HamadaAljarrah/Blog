import React from 'react'
import Container from '../../layouts/Container/Container'
import classes from "./profile.module.scss"
import { useTheme } from '../../context/them.context'
import { Protected } from '../../layouts/Protected'



const Profile = () => {

    const { theme } = useTheme();

    return (
        <Protected>
            <Container>
                <div className={`${classes.container} ${classes[theme]}`}>
                    <h1>Profile</h1>
                    <div>
                        <p><strong>Name: </strong>data</p>
                        <p><strong>Email: </strong>data</p>
                        <p><strong>ID: </strong>data</p>
                    </div>
                    <button>Logout</button>
                </div>
            </Container>
        </Protected>


    )
}



export default Profile
