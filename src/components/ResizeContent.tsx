import styles from "@/styles/Home.module.css";
import { useEffect } from "react";

type MODE =
    | "WITH_WIDTH"
    | "WITH_HEIGHT"
    | "WITH_BOTH"
    | "CONSTANT"
    | "NO_RESIZE";

function ResizeContent({
    children,
    mode = "WITH_BOTH",
    resizeScale = 1,
    onResized = () => {},
    resizeContainerId = "resize-container",
    className = "",
}: {
    children: any;
    mode?: MODE;
    onResized?: () => void;
    className?: string;
    resizeContainerId?: string;
    resizeScale?: number;
}) {
    function resizeContent() {
        const content = document.getElementById(resizeContainerId);

        if (content) {
            const { offsetWidth, offsetHeight } = content;
            const scaleWidth = window.innerWidth / offsetWidth;
            const scaleHeight = window.innerHeight / offsetHeight;

            console.log("original container size: ", offsetWidth, offsetHeight);

            let scale = Math.min(scaleWidth, scaleHeight);

            switch (mode) {
                case "WITH_WIDTH":
                    scale = scaleWidth;
                    break;

                case "WITH_HEIGHT":
                    scale = scaleHeight;
                    break;

                case "NO_RESIZE":
                    scale = 1;
                    break;

                case "CONSTANT":
                    scale = resizeScale;
                    break;

                default:
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
        <div
            id="resize-container"
            className={`${styles.resizeContent} ${className}`}
        >
            {children}
        </div>
    );
}

export default ResizeContent;

