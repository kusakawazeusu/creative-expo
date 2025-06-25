import styles from "@/styles/Loading.module.css";
import { useEffect, useState } from "react";

function LoadingSection() {
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPercentage((number) => {
                if (number > 99) {
                    clearInterval(interval);
                    return 100;
                }

                return number + 1;
            });
        }, 50);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            <img
                className={styles.logo}
                alt="logo"
                src="assets/logo.png"
                height="30"
                width="180"
            />
            <div className={styles.illustration}>
                <img
                    alt="loading illustration"
                    src="assets/loading.png"
                    height="112"
                    width="130"
                />
                <p>{percentage}%</p>
            </div>
        </>
    );
}

export default LoadingSection;

