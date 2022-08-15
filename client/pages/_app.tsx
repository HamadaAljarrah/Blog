import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ThemProvider } from "../context/them.context";
import Background from "../layouts/Background/Background";
import Container from "../layouts/Container/Container";
import Navbar from "../layouts/Navbar/Navbar";
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
