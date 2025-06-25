import buttonStyles from "@/styles/Button.module.css";

function StartSection({ onStartClicked }: { onStartClicked?: () => void }) {
    return (
        <>
            <button onClick={onStartClicked} className={buttonStyles.button}>
                START
            </button>
        </>
    );
}

export default StartSection;

