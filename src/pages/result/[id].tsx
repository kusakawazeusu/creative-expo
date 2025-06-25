import Head from "next/head";
import styles from "@/styles/Result.module.css";
import { useEffect, useRef } from "react";

function GameResultPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas) {
            const ctx = canvas.getContext("2d");
            const image = new Image();
            image.src = "/assets/result/1.png";

            image.onload = () => {
                const scale = window.devicePixelRatio || 1;
                canvas.width = image.width * scale;
                canvas.height = image.height * scale;

                if (ctx) {
                    ctx.scale(scale, scale);
                    ctx.drawImage(image, 0, 0);

                    ctx.rotate((-5 * Math.PI) / 180);
                    ctx.font = "140px Shrikhand-Regular";
                    ctx.fillStyle = "white";
                    ctx.strokeStyle = "#0d5899";
                    ctx.lineWidth = 3;
                    ctx.textAlign = "center";

                    ctx.fillText("123", 210, 1060);
                    ctx.strokeText("123", 210, 1060);

                    ctx.rotate((10 * Math.PI) / 180);
                    ctx.font = "40px Shrikhand-Regular";
                    ctx.fillStyle = "white";
                    ctx.textAlign = "center";

                    ctx.fillText("123", 730, 1080);

                    // ctx.fillText("第二段文字", 50, 100); // 第二段文字，座標 (50, 100)
                }
            };
        }
    }, []);

    return (
        <>
            <Head>
                <title>遊戲結果</title>
                <meta name="description" content="Creative Expo 2025" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.png" />
            </Head>

            <main className={styles.main}>
                <img
                    className={styles.logo}
                    alt="logo"
                    src="/assets/logo.png"
                    height="30"
                    width="180"
                />

                <canvas className={styles.canvas} ref={canvasRef} />
            </main>
        </>
    );
}

export default GameResultPage;

