import Head from "next/head";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

const AppWithoutSSR = dynamic(() => import("@/App"), { ssr: false });

export default function Home() {
    return (
        <>
            <Head>
                <title>Creative Expo 2025</title>
                <meta name="description" content="Creative Expo 2025" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <main className={`${styles.main} ${inter.className}`}>
                <AppWithoutSSR />
            </main>
        </>
    );
}

