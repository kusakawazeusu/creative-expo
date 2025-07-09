import { motion } from "framer-motion";

export const sentenceVariants = {
    hidden: {},
    // change staggerChildren variable to speed up or slow down typing.
    visible: { opacity: 1, transition: { staggerChildren: 0.02 } },
};

export const letterVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { opacity: { duration: 0 } } },
};

export const TypeWritterText = ({
    text,
    className,
    ...rest
}: {
    text: string;
    className: string;
}) => (
    <motion.p
        key={text}
        variants={sentenceVariants}
        initial="hidden"
        animate="visible"
        className={className}
        {...rest}
    >
        {text.split("").map((char, i) => (
            <motion.span key={`${char}-${i}`} variants={letterVariants}>
                {char}
            </motion.span>
        ))}
    </motion.p>
);

