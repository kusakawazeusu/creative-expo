import styles from "@/styles/Home.module.css";
import { useEffect } from "react";

type MODE = "WITH_WIDTH" | "WITH_HEIGHT" | "WITH_BOTH" | "NO_RESIZE";

function ResizeContent({
    children,
    mode = "WITH_BOTH",
    onResized = () => {},
}: {
    children: any;
    mode?: MODE;
    onResized?: () => void;
}) {
    function resizeContent() {
        const content = document.getElementById("resize-container");

        if (content) {
            const { offsetWidth, offsetHeight } = content;
            const scaleWidth = window.innerWidth / offsetWidth;
            const scaleHeight = window.innerHeight / offsetHeight;

            let scale = Math.min(scaleWidth, scaleHeight);

            switch (mode) {
                case "WITH_WIDTH":
                    scale = scaleWidth;
                    break;

                case "WITH_HEIGHT":
                    scale = scaleHeight;
                    break;

                default:
                case "NO_RESIZE":
                    scale = 1;
                    break;
            }

            content.style.transform = `scale(${scale})`;
        }

        if (typeof onResized === "function") {
            onResized();
        }
    }

    useEffect(() => {
        window.addEventListener("resize", resizeContent);
        resizeContent();

        return () => {
            window.removeEventListener("resize", resizeContent);
        };
    }, [mode]);

    if (mode === "NO_RESIZE") {
        return children;
    }

    return (
        <div id="resize-container" className={styles.resizeContent}>
            {children}
        </div>
    );
}

export default ResizeContent;

