import React, { useState } from "react";
import { NextComponentType } from "next";
import { submitForm } from "../form.logic";
import Link from "next/link";
import classes from "../form.module.scss";
import Router from "next/router";
import { useTheme } from "../../../context/them.context";
import Input from "../../../components/Input/Input";
import Container from "../../../components/Container/Container";

const Register: NextComponentType = () => {

    const { theme } = useTheme();
    const [message, setMessage] = useState<string>();

    const submitHandler = submitForm("auth/register", "POST", (result: any) => {
        if (result.success) return Router.push("auth/login");
        setMessage(result.message);
    });

    return (
        <Container>
            <form className={`${classes.form} ${classes[theme]}`} onSubmit={submitHandler}>

                <h1>Register</h1>
                {message && <p className={classes.message}>{message}</p>}
                <Input forNameId="name" label="Name" type="text" placeholder="Username" />
                <Input forNameId="email" label="Email" type="email" placeholder="Email" />
                <Input forNameId="password" label="Password" type="password" placeholder="Password" />
                <button type="submit">Register</button>
                <p>Already have an account? <Link className={classes.link} href="login">Login</Link></p>

            </form>
        </Container>

    );
};

export default Register;
