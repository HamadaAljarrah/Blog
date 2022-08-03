import { NextComponentType } from "next";
import React from "react";
import Link from "next/link";
import classes from "../register/register.module.scss";
const Login: NextComponentType = () => {
    return (
        <form className={classes.form}>
            <h1>Login</h1>
            <div className={classes.input_row}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email"
                    required
                />
            </div>
            <div className={classes.input_row}>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    required
                />
            </div>
            <button type="submit">Login</button>
            <p>
                Don't have an account? <Link href="register">Register</Link>
            </p>
        </form>
    );
};

export default Login;
