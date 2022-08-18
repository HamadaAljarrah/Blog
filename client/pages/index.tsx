import type { NextPage } from "next";
import Background from "../layouts/Background/Background";
import Container from "../layouts/Container/Container";
import { useTheme } from "../context/them.context";
import classes from "./home.module.scss"
import Button from "../components/Button/Button";
import Link from "next/link";


const Home: NextPage = () => {
    const { theme } = useTheme();
    return (
        <Container>
            <div className={`${classes.wrapper} ${classes[theme]}`}>
                <h1>WELCOME TO BLOGGY</h1>
                <p>Write your stories, share your knowladge and get instpiration </p>
                <Link href="auth/login">
                    <Button type="button" text="Get started" />

                </Link>
            </div>
        </Container>

    );
};

export default Home;
