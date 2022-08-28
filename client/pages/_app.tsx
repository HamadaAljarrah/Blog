import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ThemProvider } from "../context/them.context";
import Background from "../layouts/Background/Background";
import Container from "../layouts/Container/Container";
import Navbar from "../layouts/Navbar/Navbar";
import Head from "next/head";
import Sidebar from "../layouts/SideBar/Sidebar";
import { AuthProvider } from "../context/auth.context";



function MyApp({ Component, pageProps }: AppProps) {

    return (
        <>
            <Head>
                <title>Bloggy</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            </Head>
            <ThemProvider>
                <AuthProvider>
                    <Background>
                        <Container>
                            <Navbar />
                            <Component {...pageProps} />
                        </Container>
                        <Sidebar />

                    </Background>
                </AuthProvider>
            </ThemProvider>
        </>

    );
}

export default MyApp;
