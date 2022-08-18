import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ThemProvider } from "../context/them.context";
import Background from "../layouts/Background/Background";
import Container from "../layouts/Container/Container";
import Navbar from "../layouts/Navbar/Navbar";
import "../styles/globals.scss"
import { AuthProvider } from "../context/auth.context";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemProvider>
            <AuthProvider>
                <Background>
                    <Container>
                        <Navbar />
                        <Component {...pageProps} />
                    </Container>
                </Background>
            </AuthProvider>
        </ThemProvider>

    );
}

export default MyApp;
