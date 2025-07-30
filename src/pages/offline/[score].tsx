import Head from "next/head";
import styles from "@/styles/Result.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import buttonStyles from "@/styles/Button.module.css";
import items from "@/data/items";
import { NextPageContext } from "next";
import { ClipLoader } from "react-spinners";
import Link from "next/link";
import { drawDownloadImage, drawMainImage } from "@/utils/drawImage";
import ResultImage from "@/components/ResultImage";
import { easeIn, motion } from "framer-motion";
import ResizeContent from "@/components/ResizeContent";
import { useRouter } from "next/router";

type Result = {
    score: number;
    name: string;
    xata_id: string;
    items: { [key: string]: number };
};

function GameOfflineResultPage({
    score,
    itemResult,
}: {
    score: number;
    itemResult: { [key: string]: number };
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isPortrait, setPortrait] = useState<boolean | null>(null);

    useEffect(() => {
        setPortrait(window.innerHeight > window.innerWidth);
    }, []);

    useEffect(() => {
        async function drawCanvas() {
            const canvas = canvasRef.current;
            await document.fonts.ready;

            const rank = 999;

            await drawMainImage(canvas, score, rank);
        }

        drawCanvas();
    }, []);

    const saveImage = useCallback(async () => {
        const canvas = document.createElement("canvas");

        const rank = 999;

        await drawDownloadImage(canvas, score, rank);

        const blob = await new Promise<Blob | null>((resolve) =>
            canvas.toBlob(resolve, "image/png")
        );

        if (!blob) {
            return;
        }

        const url = URL.createObjectURL(blob);
        window.open(url);
        URL.revokeObjectURL(url);
    }, []);

    const shareResult = useCallback(async () => {
        const canvas = document.createElement("canvas");

        const rank = 999;

        await drawDownloadImage(canvas, score, rank);

        const blob = await new Promise<Blob | null>((resolve) =>
            canvas.toBlob(resolve, "image/png")
        );

        if (!blob) {
            return;
        }

        const file = new File([blob], "shared-image.png", {
            type: "image/png",
        });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
                await navigator.share({
                    text: `呦呼～跟你炫耀這是我玩𝙍𝙐𝙉 𝙢𝙮 𝙄𝙋的成績！≡Σ(((つ•̀ω•́)つ
挑戰看看你能超越我的排名嗎？

𝗜𝗣𝗢𝗣-𝗨𝗣臺咖潛力IP養成專門店 
𝘱𝘳𝘦𝘴𝘦𝘯𝘵𝘦𝘥 𝘣𝘺 𝘛𝘈𝘐𝘊𝘊𝘈

▞  2025臺灣文博會快閃登場  ▚
8/5-11｜南港展覽館1館J2-001

https://taicca.pse.is/7uxh23
`,
                    files: [file],
                });
            } catch (err) {
                alert("分享圖片時發生錯誤");
            }
        } else {
            alert("此裝置不支援圖片分享");
        }
    }, []);

    function getDesktopScale() {
        const screenHeight = window.innerHeight;
        const supposedImageHeight = Math.floor(screenHeight * 0.8);
        const scale = supposedImageHeight / 570;

        console.log(scale);

        return Math.max(scale, 1);
    }

    // 還沒有判斷直或橫設備時，先不 render
    if (isPortrait === null) {
        return null;
    }

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

            <div className={styles.bg} />
            <ResizeContent
                mode={isPortrait ? "WITH_WIDTH" : "CONSTANT"}
                resizeScale={getDesktopScale()}
            >
                <main className={`${styles.main}`}>
                    <img
                        className={styles.logo}
                        alt="logo"
                        src="/assets/logo.png"
                    />
                    <ResultImage score={score} rank={999} />

                    <div className={styles.buttonContainer}>
                        <button
                            className={`${buttonStyles.button} ${buttonStyles.sm}`}
                            style={{
                                width: 280,
                                marginTop: 24,
                                fontFamily: "JinHeiFont",
                                fontWeight: 500,
                                letterSpacing: 2,
                            }}
                            onClick={shareResult}
                        >
                            分享炫耀成績
                        </button>
                        <button
                            className={`${buttonStyles.button} ${buttonStyles.sm}`}
                            style={{
                                width: 280,
                                marginTop: 20,
                                fontFamily: "JinHeiFont",
                                fontWeight: 500,
                                letterSpacing: 2,
                            }}
                            onClick={saveImage}
                        >
                            儲存遊戲結果
                        </button>
                        <Link href="/">
                            <button
                                className={`${buttonStyles.button} ${buttonStyles.sm}`}
                                style={{
                                    width: 280,
                                    marginTop: 20,
                                    fontFamily: "JinHeiFont",
                                    fontWeight: 500,
                                    letterSpacing: 2,
                                }}
                            >
                                再玩一次
                            </button>
                        </Link>
                    </div>

                    <div className={styles.chanceContainer}>
                        <h1>你獲得的商業機會</h1>

                        {Object.keys(itemResult).map((key) => {
                            const index = Number(key) - 1;

                            return (
                                <MotionChanceItem
                                    initial={{ opacity: 0, x: 80 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{
                                        delay: 0.3,
                                        duration: 0.5,
                                        ease: [0.25, 0.1, 0.25, 1],
                                    }}
                                    viewport={{ once: true }}
                                    item={items[index]}
                                    key={`item-${key}`}
                                    number={itemResult[key]}
                                />
                            );
                        })}
                    </div>

                    <div
                        className={styles.infoBgContainer}
                        style={{
                            backgroundPosition: isPortrait
                                ? "50% 0%"
                                : "50% 30%",
                        }}
                    >
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
                                    <span className={styles.standPos}>
                                        J2-001
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer className={styles.footer}>
                        <img src="/assets/footer.png" alt="logo" />
                    </footer>
                </main>
            </ResizeContent>
        </>
    );
}

const MotionRankItem = motion(RankItem);

function RankItem({
    rank,
    name,
    score,
    style,
    me,
    className = "",
    ...props
}: {
    rank: number;
    name: string;
    score: number;
    style?: { [key: string]: any };
    me?: boolean;
    className?: string;
}) {
    return (
        <div
            className={`${styles.rankingItem} ${className}`}
            style={style}
            {...props}
        >
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

const MotionChanceItem = motion(ChanceItem);

function ChanceItem({
    item,
    number,
    className = "",
    ...props
}: {
    item: Item;
    number: number;
    className?: string;
}) {
    return (
        <div className={`${styles.chanceItem} ${className}`} {...props}>
            <div className={styles.imageWrapper}>
                <img src={item.image} alt={item.title} />
            </div>
            <div className={styles.textContainer}>
                <div className={styles.itemTitle}>{item.title}</div>
                <div className={styles.itemDescription}>{item.description}</div>
            </div>
            <div className={styles.itemNumberContainer}>
                <span>x</span>
                <span className={styles.itemNumber}>
                    {Math.min(number, 99)}
                </span>
            </div>
        </div>
    );
}

export default GameOfflineResultPage;

export async function getServerSideProps(ctx: NextPageContext) {
    const items = Object.assign({}, ctx.query);
    delete items.score;

    return {
        props: {
            score: ctx.query.score,
            itemResult: items,
        },
    };
}

