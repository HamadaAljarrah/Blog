import React, { useState } from "react";
import Link from "next/link";
import classes from "../form.module.scss";
import Router from "next/router";
import { useTheme } from "../../../context/them.context";
import Input from "../../../components/Input/Input";
import { NextPage } from "next";
import Button from "../../../components/Button/Button";
import { useForm } from "react-hook-form";
import { User } from "../../../types/user";
import { sendAuthRequest } from "../../../helpers/auth";


type LoginData = Omit<User, "_id">

const Register: NextPage = (): JSX.Element => {

    const { theme } = useTheme();
    const [message, setMessage] = useState<string>();
    const { handleSubmit, register } = useForm<LoginData>()

    const onSubmit = async (data: LoginData) => {
        const { name, email, password } = data
        const response = await sendAuthRequest('register', { name, email, password })
        if (response.success) return Router.push("/auth/login");
        setMessage(response.message)
    }


    return (
        <form className={`${classes.form} ${classes[theme]}`} onSubmit={handleSubmit(onSubmit)}>

            <h1>Sign up</h1>
            {message && <p className={classes.message}>{message}</p>}
            <Input
                register={register('name')}
                label='Name'
                htmlFor='name'
                type='text'
                placeholder='Enter your username'
            />
            <Input
                register={register('email')}
                label='Email'
                htmlFor='email'
                type='email'
                placeholder='Enter your email'
            />
            <Input
                register={register('password')}
                label='Password'
                htmlFor='password'
                type='password'
                placeholder='Enter your password'
            />
            <Button type='submit' text='Sign up' />
            <p>Already have an account? <Link className={classes.link} href='login'>Login</Link></p>

        </form>

    );
};

export default Register;
