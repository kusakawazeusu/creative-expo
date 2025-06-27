import Head from "next/head";
import styles from "@/styles/Result.module.css";
import { useEffect, useRef } from "react";
import buttonStyles from "@/styles/Button.module.css";
import items from "@/data/items";

const dummyTopData = [
    {
        rank: 1,
        name: "第一名",
        score: 4223,
    },
    {
        rank: 2,
        name: "第二名",
        score: 4122,
    },
    {
        rank: 3,
        name: "第三名",
        score: 4021,
    },
];

const dummyRankData = [
    {
        rank: 123,
        name: "路人 a",
        score: 223,
    },
    {
        rank: 124,
        name: "路人 b",
        score: 222,
    },
    {
        rank: 125,
        name: "我",
        score: 221,
    },
];

function GameResultPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const loadImage = (src: string) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(img);
            img.onerror = (error) => reject(error);
        });
    };

    useEffect(() => {
        async function drawCanvas() {
            const canvas = canvasRef.current;
            await document.fonts.ready;

            if (canvas) {
                const ctx = canvas.getContext("2d");
                const image = (await loadImage(
                    "/assets/result/1.png"
                )) as HTMLImageElement;

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
                }
            }
        }

        drawCanvas();
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

            <main className={`${styles.main}`}>
                <img
                    className={styles.logo}
                    alt="logo"
                    src="/assets/logo.png"
                    height="30"
                    width="180"
                />
                <canvas className={styles.canvas} ref={canvasRef} />

                <div className={styles.buttonContainer}>
                    <button
                        className={`${buttonStyles.button} ${buttonStyles.sm}`}
                        style={{
                            width: 240,
                            marginTop: 24,
                            fontFamily: "JinHeiFont",
                            fontWeight: 500,
                            letterSpacing: 2,
                        }}
                    >
                        分享炫耀成績
                    </button>
                    <button
                        className={`${buttonStyles.button} ${buttonStyles.sm}`}
                        style={{
                            width: 240,
                            marginTop: 20,
                            fontFamily: "JinHeiFont",
                            fontWeight: 500,
                            letterSpacing: 2,
                        }}
                    >
                        儲存遊戲結果
                    </button>
                    <button
                        className={`${buttonStyles.button} ${buttonStyles.sm}`}
                        style={{
                            width: 240,
                            marginTop: 20,
                            fontFamily: "JinHeiFont",
                            fontWeight: 500,
                            letterSpacing: 2,
                        }}
                    >
                        再玩一次
                    </button>
                </div>

                <div className={styles.rankingContainer}>
                    <h1>Ranking</h1>
                    <div className={styles.rankingCard}>
                        {dummyTopData.map((item, index) => (
                            <RankItem
                                rank={item.rank}
                                name={item.name}
                                score={item.score}
                                key={`item-${index}`}
                            />
                        ))}

                        <Dots />

                        {dummyRankData.map((item, index) => (
                            <RankItem
                                key={`item-me-${index}`}
                                me={index === dummyRankData.length - 1}
                                rank={item.rank}
                                name={item.name}
                                score={item.score}
                                style={{
                                    borderTop:
                                        index === 0 ? "1px solid #0d5899" : "",
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className={styles.chanceContainer}>
                    <h1>你獲得的商業機會</h1>

                    {items.map((item, index) => (
                        <ChanceItem item={item} key={`item-${index}`} />
                    ))}
                </div>

                <div className={styles.infoBgContainer}>
                    <div className={styles.infoContainer}>
                        <img
                            src="/assets/org-logo.png"
                            alt="臺灣文博會"
                            height="60"
                            width="60"
                        />
                        <div className={styles.dateInfoContainer}>
                            <div className={styles.dateContainer}>
                                <span
                                    className={`${styles.date} ${styles.dateTue}`}
                                >
                                    8.05
                                </span>
                                <span className={styles.dateSeparater} />
                                <span
                                    className={`${styles.date} ${styles.dateMon}`}
                                >
                                    8.11
                                </span>
                            </div>

                            <div className={styles.addressContainer}>
                                <span className={styles.address}>
                                    南港展覽館1樓
                                </span>
                                <span className={styles.standPos}>J2-001</span>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className={styles.footer}>
                    <img src="/assets/footer-logo.png" alt="logo" />
                </footer>
            </main>
        </>
    );
}

function RankItem({
    rank,
    name,
    score,
    style,
    me,
}: {
    rank: number;
    name: string;
    score: number;
    style?: { [key: string]: any };
    me?: boolean;
}) {
    return (
        <div className={`${styles.rankingItem}`} style={style}>
            {me ? <div className={styles.me} /> : null}
            <div className={styles.rankNameContainer}>
                <div className={rank < 4 ? styles.topRank : styles.normalRank}>
                    {rank}
                </div>
                <span className={styles.name} style={{ marginLeft: 12 }}>
                    {name}
                </span>
            </div>

            <span className={styles.score}>
                {score} <span className={styles.name}>天</span>
            </span>
        </div>
    );
}

function Dots() {
    return <div className={styles.dots}>⋯</div>;
}

type Item = {
    title: string;
    description: string;
    image: string;
};

function ChanceItem({ item }: { item: Item }) {
    return (
        <div className={styles.chanceItem}>
            <div className={styles.imageWrapper}>
                <img src={item.image} alt={item.title} />
            </div>
            <div className={styles.textContainer}>
                <div className={styles.itemTitle}>{item.title}</div>
                <div className={styles.itemDescription}>{item.description}</div>
            </div>
            <div className={styles.itemNumberContainer}>
                <span>x</span>
                <span className={styles.itemNumber}>10</span>
            </div>
        </div>
    );
}

export default GameResultPage;

