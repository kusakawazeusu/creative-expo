import styles from "@/styles/Intro.module.css";
import buttonStyles from "@/styles/Button.module.css";
import { TypeWritterText } from "@/components/TypeWritterText";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import ResizeContent from "@/components/ResizeContent";

function IntroSection({
    name,
    setName,
    onReadyClicked,
}: {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    onReadyClicked: () => void;
}) {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <ResizeContent
            className={styles.resizeContainer}
            resizeContainerId="intro-container"
        >
            <motion.div
                className={styles.container}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                id="intro-container"
            >
                <h1 className={styles.h1}>Hello</h1>
                <input
                    ref={inputRef}
                    className={styles.input}
                    placeholder="請輸入暱稱"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={20}
                    required
                />
                <TypeWritterText
                    className={styles.p}
                    text={`經營 IP 像是一場慢慢長大的冒險！
                一路上要閃避危機、尋找不同機會，
                來挑戰看看，
                你能和 IP 一起走得多遠？`}
                />
                <div className={styles.card}>
                    <div className={styles.item}>
                        <motion.img
                            src="assets/items/5.png"
                            height={60}
                            width={60}
                            alt="item"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        />
                        <p>
                            收集道具 <br />
                            增加天數 <br />
                        </p>
                    </div>

                    <div className={styles.item}>
                        <motion.img
                            src="assets/items/11.png"
                            height={60}
                            width={60}
                            alt="item"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        />
                        <p>
                            小心阻礙 <br />
                            避開障礙 <br />
                        </p>
                    </div>
                </div>

                <button
                    className={buttonStyles.button}
                    style={{ marginTop: 36 }}
                    onClick={() => {
                        if (inputRef.current && inputRef.current.value === "") {
                            inputRef.current.reportValidity();
                            return;
                        }

                        onReadyClicked();
                    }}
                >
                    READY
                </button>
            </motion.div>
        </ResizeContent>
    );
}

export default IntroSection;

