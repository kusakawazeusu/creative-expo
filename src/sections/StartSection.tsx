import ResizeContent from "@/components/ResizeContent";
import buttonStyles from "@/styles/Button.module.css";
import styles from "@/styles/Start.module.css";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

function StartSection({ onStartClicked }: { onStartClicked?: () => void }) {
    const controls = useAnimation();

    useEffect(() => {
        controls
            .start({
                scale: 1,
                transition: { duration: 0.5, ease: "backInOut" },
            })
            .then(() => {
                controls.start({
                    scale: [1, 1.1, 1],
                    transition: {
                        delay: 1,
                        repeatDelay: 1.5,
                        duration: 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    },
                });
            });
    }, []);

    return (
        <ResizeContent className={styles.resizeContainer}>
            <div className={styles.startContainer}>
                <div className={styles.bg}>
                    <div className={styles.bgInner}>
                        <motion.img
                            initial={{ rotate: 0, translateX: "-50%" }}
                            animate={{ rotate: 360 }}
                            transition={{
                                repeat: Infinity,
                                duration: 5,
                                ease: "easeInOut",
                            }}
                            className={styles.bgCircle}
                            src="/assets/start/bg-circle.png"
                            alt="bg-circle"
                        />
                    </div>

                    <motion.img
                        className={styles.title}
                        initial={{ x: "-50%", scale: 0 }}
                        animate={controls}
                        alt="title"
                        src="/assets/start/title.png"
                    />

                    <img
                        className={styles.badge}
                        alt="badge"
                        src="/assets/start/badge.png"
                    />

                    <img
                        className={styles.character}
                        alt="character"
                        src="/assets/start/character.png"
                    />

                    <motion.img
                        className={styles.starLT}
                        animate={{
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        alt="star"
                        src="/assets/star.png"
                    />
                    <motion.img
                        className={styles.starRT}
                        animate={{
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.6,
                        }}
                        alt="star"
                        src="/assets/star.png"
                    />
                    <motion.img
                        className={styles.starLB}
                        animate={{
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.2,
                        }}
                        alt="star"
                        src="/assets/star.png"
                    />
                    <motion.img
                        className={styles.starRB}
                        animate={{
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.4,
                        }}
                        alt="star"
                        src="/assets/star.png"
                    />
                </div>

                <button
                    onClick={onStartClicked}
                    className={buttonStyles.button}
                    style={{ width: "85%" }}
                >
                    START
                </button>
            </div>
        </ResizeContent>
    );
}

export default StartSection;

