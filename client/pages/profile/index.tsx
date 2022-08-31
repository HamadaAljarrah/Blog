import React from 'react'
import classes from "./profile.module.scss"
import { useTheme } from '../../context/them.context'
import { Protected } from '../../components/Protected/Protected'
import PageWrapper from '../../layouts/PageWrapper/PageWrapper'
import { useProtect } from '../../hook/useProtect'
import Button from '../../components/Button/Button'
import { sendLogoutRequest } from '../../helpers/auth'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/auth.context'


const Profile = () => {
    const { theme } = useTheme();
    const { user } = useProtect();
    const {setIsAuthenticated} = useAuth();
    const router = useRouter();
    const clickHandler = async () => {
        const token = JSON.parse(localStorage.getItem('token') || "").value;        
        const response = await sendLogoutRequest(token || "");
        if(response.success){
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            return router.push('/auth/login')
        } 
        console.log("Failed to logout");

        
    }
    return (
        <Protected>
            <PageWrapper>
                <div className={`${classes.container} ${classes[theme]}`}>
                    <h1>Profile</h1>
                    <div>
                        {user &&
                            <>
                                <p><strong>Name: </strong>{user.name}</p>
                                <p><strong>Email: </strong>{user.email}</p>
                                <p><strong>ID: </strong>{user._id}</p>
                            </>
                        }
                    </div>
                    <Button onClick={clickHandler} type='button' text='Logout' />
                </div>
            </PageWrapper>
        </Protected>

    )
}

export default Profile

