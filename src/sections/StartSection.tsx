import buttonStyles from "@/styles/Button.module.css";
import styles from "@/styles/Start.module.css";
import { motion } from "framer-motion";

function StartSection({ onStartClicked }: { onStartClicked?: () => void }) {
    return (
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
                    initial={{ translateX: "-50%", opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 1,
                        ease: "linear",
                    }}
                    alt="title"
                    src="/assets/start/title.png"
                />

                <img
                    className={styles.character}
                    alt="character"
                    src="/assets/start/character.png"
                />
            </div>

            <button
                onClick={onStartClicked}
                className={buttonStyles.button}
                style={{ width: "65%" }}
            >
                START
            </button>
        </div>
    );
}

export default StartSection;

