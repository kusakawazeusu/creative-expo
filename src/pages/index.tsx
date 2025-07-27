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
                <title>Run my IP ! IP經營大挑戰</title>
                <meta
                    name="description"
                    content="來挑戰看看，你能和IP一起走多遠？"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.png" />
                <meta property="og:title" content="Run my IP ! IP經營大挑戰" />
                <meta
                    property="og:description"
                    content="來挑戰看看，你能和IP一起走多遠？"
                />
                <meta property="og:image" content="/og-image.jpg" />
                <meta
                    property="og:url"
                    content="https://creative-expo-lake.vercel.app/"
                />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="zh_TW" />
            </Head>
            <div style={{ background: "#0d5899", overflowY: "hidden" }}>
                <main
                    className={`${styles.main} ${inter.className}`}
                    id="main-container"
                >
                    <AppWithoutSSR />
                </main>
            </div>
        </>
    );
}

