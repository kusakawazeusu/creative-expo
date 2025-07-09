import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

/**
 *
 * @param root0
 * @param root0.value
 */

type Props = {
    value: number;
    direction?: "up" | "down";
    className?: string;
};

export default function Counter({ value, direction = "up", className }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const motionValue = useMotionValue(direction === "down" ? value : 0);
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 100,
    });
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(direction === "down" ? 0 : value);
        }
    }, [motionValue, isInView]);

    useEffect(
        () =>
            springValue.on("change", (latest) => {
                if (ref.current) {
                    ref.current.textContent = latest.toFixed(0);
                }
            }),
        [springValue]
    );

    return <div className={className} ref={ref} />;
}

