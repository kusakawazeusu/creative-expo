import styles from "@/styles/ResultImage.module.css";
import { motion } from "framer-motion";
import { accessories, getImageIndex, texts } from "@/utils/drawImage";
import Counter from "@/components/Counter";
import { useEffect, useState } from "react";

function ResultImage({ score, rank }: { score: number; rank: number }) {
    const imageIndex = getImageIndex(score);
    // const [startCounting, setStartCounting] = useState(false);

    // useEffect(() => {
    //     setTimeout(() => setStartCounting(true), 1000);
    // }, []);

    const characterPosition =
        imageIndex === 5
            ? {
                  left: "52px",
                  top: "82px",
              }
            : {
                  left: "60px",
                  top: "68px",
              };

    return (
        <div className={styles.container}>
            <img
                src={`/assets/result/${imageIndex}.png`}
                className={styles.image}
            />

            <motion.div
                className={styles.characterImageContainer}
                style={{ ...characterPosition }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring" }}
            >
                <img
                    src={`/assets/result/ch${imageIndex}.png`}
                    className={styles.image}
                />

                {accessories[imageIndex].map((accessory, index) => (
                    <motion.img
                        animate={{
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.1 * index,
                        }}
                        key={`accessory-${index}`}
                        src={`/assets/${accessory.type}.png`}
                        style={{
                            position: "absolute",
                            left: accessory.x,
                            top: accessory.y,
                            width: accessory.size,
                        }}
                    />
                ))}
            </motion.div>

            <motion.div className={styles.scoreContainer}>
                <Counter value={score} />
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className={styles.rank}
            >
                {rank}
            </motion.div>

            <div className={styles.textContainer}>
                {texts[imageIndex].split("\n").map((t, index) => (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.4 + index * 0.1,
                            duration: 0.5,
                            ease: "linear",
                        }}
                        key={t}
                    >
                        {t}
                    </motion.p>
                ))}
            </div>
        </div>
    );
}

export default ResultImage;

