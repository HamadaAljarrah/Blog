import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ThemProvider } from "../context/them.context";
import Background from "../components/Background/Background";
import Container from "../components/Container/Container";
import Navbar from "../components/Navbar/Navbar";
import "../styles/globals.scss"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemProvider>
            <Background>
                <Container>
                    <Navbar />
                </Container>
                <Component {...pageProps} />
            </Background>
        </ThemProvider>

    );
}

export default MyApp;
