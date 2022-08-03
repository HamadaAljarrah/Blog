import type { NextPage } from "next";
import Link from "next/link";
const Home: NextPage = () => {
    return (
        <div>
            <h2>Welcome to bloggy</h2>
            <Link href="login">Login</Link> <br />
            <Link href="register">Register</Link>
        </div>
    );
};

export default Home;
