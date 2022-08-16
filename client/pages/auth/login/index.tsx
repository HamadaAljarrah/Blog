import React, { useState } from "react";
import Link from "next/link";
import classes from "../form.module.scss";
import { useTheme } from "../../../context/them.context";
import Container from "../../../layouts/Container/Container";
import Input from "../../../components/Input/Input";
import { submitForm } from "../form.logic";
import Router from "next/router";
import { NextPage } from "next";
import { setWithExpiry } from "../../../helpers/jwt";




const Login: NextPage = (): JSX.Element => {

    const { theme } = useTheme();
    const [message, setMessage] = useState<string>();

    const submitHandler = submitForm("/auth/login", "POST", (result: any) => {
        if (result.success) {
            const oneHour = 1000 * 3
            setWithExpiry("token", result.token, oneHour);
            return Router.push("/profile");
        }
        setMessage(result.message);
    });

    return (
        <Container>
            <form onSubmit={submitHandler} className={`${classes.form} ${classes[theme]}`}>
                <h1>Login</h1>
                {message && <p className={classes.message}>{message}</p>}
                <Input type="email" forNameId="email" label="Email" placeholder="Email" />
                <Input type="password" forNameId="password" label="Password" placeholder="Password" />
                <button type="submit">Login</button>
                <p>Don't have an account? <Link href="register">Register</Link></p>
            </form>
        </Container>
    );
};

export default Login;
