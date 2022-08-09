import { NextComponentType } from "next";
import React from "react";
import Link from "next/link";
import classes from "../register/register.module.scss";
import { useTheme } from "../../context/them.context";
import Container from "../../components/Container/Container";
import { Input } from "../../components/Input/Input";

const Login: NextComponentType = () => {
    const {theme} = useTheme();
    return (
        <Container>
        <form className={`${classes.form} ${classes[theme]}`}>
            <h1>Login</h1>
            <Input type="email" forNameId="email" label="Email" placeholder="e.g hamada@hotmail.com"/>
            <Input type="password" forNameId="password" label="Password" placeholder="e.g 123456"/>
            <button type="submit">Login</button>
            <p>
                Don't have an account? <Link href="register">Register</Link>
            </p>
        </form>
        </Container>
    );
};

export default Login;
