import styles from "@/styles/Home.module.css";
import { useEffect } from "react";

function ResizeContent({ children }: { children: any }) {
    function resizeContent() {
        const content = document.getElementById("resize-container");

        if (content) {
            const { offsetWidth, offsetHeight } = content;
            const scaleWidth = window.innerWidth / offsetWidth;
            const scaleHeight = window.innerHeight / offsetHeight;
            const scale = Math.min(scaleWidth, scaleHeight);

            content.style.transform = `scale(${scale})`;
        }
    }

    useEffect(() => {
        window.addEventListener("resize", resizeContent);
        resizeContent();

        return () => {
            window.removeEventListener("resize", resizeContent);
        };
    }, []);

    return (
        <div id="resize-container" className={styles.resizeContent}>
            {children}
        </div>
    );
}

export default ResizeContent;

