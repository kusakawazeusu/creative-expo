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
        <div className={styles.container}>
            <img className={styles.logo} alt="logo" src="assets/logo.png" />
            <div className={styles.illustration}>
                <img alt="loading illustration" src="assets/loading.png" />
                <p>{percentage}%</p>
            </div>
        </div>
    );
}

export default LoadingSection;

