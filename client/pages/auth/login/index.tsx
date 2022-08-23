import React, { useState } from "react";
import classes from "../form.module.scss";

import Input from "../../../components/Input/Input";
import Router from "next/router";
import Button from "../../../components/Button/Button";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { setWithExpiry } from "../../../helpers/jwt";
import { sendAuthRequest } from "../../../helpers/auth";
import { useTheme } from "../../../context/them.context";
import { User } from "../../../types/user";


type LoginData = Omit<User, "name" | "_id">

const Login = () => {

    const { theme } = useTheme();
    const [message, setMessage] = useState<string>();
    const { register, handleSubmit } = useForm<LoginData>();

    const onSubmit = async (data: LoginData) => {
        const { email, password } = data
        const response = await sendAuthRequest('login', { email, password })
        if (response.success) {
            const oneHour = 1000 * 60 * 15
            setWithExpiry("token", response.token, oneHour);
            return Router.push("/profile");
        }
        setMessage(response.message)
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`${classes.form} ${classes[theme]}`}>
            <h1>Login</h1>
            {message && <p className={classes.message}>{message}</p>}
            <Input
                htmlFor='email'
                register={register('email')}
                type='email'
                label='Email'
                placeholder='Enter your email'
            />
            <Input
                htmlFor='password'
                register={register('password')}
                type="password" label="Password"
                placeholder='Enter your password'
            />
            <Button type='submit' text='login' />
            <p>Don't have an account? <Link href='register'>Sign up</Link></p>
        </form>
    );
};

export default Login;
