import type { NextPage } from "next";
import { useTheme } from "../context/them.context";
import classes from "./home.module.scss"
import Button from "../components/Button/Button";
import Link from "next/link";


const Home: NextPage = () => {
    const { theme } = useTheme();
    return (
        <div className={`${classes.wrapper} ${classes[theme]}`}>
            <h1>WELCOME TO BLOGGY</h1>
            <p>Write your stories, share your knowladge and get instpiration </p>
            <Button link="/auth/login" type="button" text="Get started" />
        </div>

    );
};

export default Home;
