import type { NextPage } from "next";
import Background from "../components/Background/Background";
import Container from "../components/Container/Container";
import { useTheme } from "../context/them.context";
import classes from "./home.module.scss"


const Home: NextPage = () => {
    const { theme } = useTheme();
    return (
        <Background>
            <Container>
                <div className={`${classes.wrapper} ${classes[theme]}`}>
                    <h1>Lading page...</h1>
                </div>
            </Container>
        </Background>

    );
};

export default Home;
