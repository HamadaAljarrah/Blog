import React from 'react'
import Container from '../../components/Container/Container'
import classes from "./profile.module.scss"
import { useTheme } from '../../context/them.context'
import Protected from '../../components/Protected/Protected'



const Profile = () => {

    const { theme } = useTheme();
    const isAuth = true;
    return (
        <Protected isAuth={isAuth}>
            <Container>
                <div className={`${classes.container} ${classes[theme]}`}>
                    <h1>Profile</h1>
                    <div>
                        <p><strong>Name: </strong>Hamada</p>
                        <p><strong>Email: </strong>Hamada@gmail.com</p>
                        <p><strong>ID: </strong>123abc</p>
                    </div>
                    <button>Logout</button>
                </div>
            </Container>
        </Protected>

    )
}



export default Profile
