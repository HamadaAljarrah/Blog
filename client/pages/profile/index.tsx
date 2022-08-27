import React from 'react'
import classes from "./profile.module.scss"
import { useTheme } from '../../context/them.context'
import { Protected } from '../../components/Protected/Protected'




const Profile = () => {
    const { theme } = useTheme();

    return (
        <Protected>
            <div className={`${classes.container} ${classes[theme]}`}>
                <h1>Profile</h1>
                <div>
                    <p><strong>Name: </strong></p>
                    <p><strong>Email: </strong></p>
                    <p><strong>ID: </strong></p>
                </div>
                <button>Logout</button>
            </div>
        </Protected>

    )
}

export default Profile

