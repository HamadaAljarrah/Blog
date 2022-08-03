import React, { useState } from "react";
import { NextComponentType } from "next";
import { submitForm } from "./register.logic";
import Link from "next/link";
import classes from "./register.module.scss";
import Router from "next/router";

const Register: NextComponentType = () => {
    const [message, setMessage] = useState<string>();
    const submitHandler = submitForm((result: any) => {
        if (result.success) {
            return Router.push("/login");
        }
        setMessage(result.message);
    });

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <h1>Register</h1>
            {message && <p className={classes.message}>{message}</p>}
            <div className={classes.input_row}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    required
                />
            </div>
            <div className={classes.input_row}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    required
                />
            </div>
            <div className={classes.input_row}>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    required
                />
            </div>
            <button type="submit">Register</button>
            <p>
                Already have an account?{" "}
                <Link className={classes.link} href="login">
                    Login
                </Link>
            </p>
        </form>
    );
};

export default Register;
