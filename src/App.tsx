import { useCallback, useRef, useState } from "react";
import { GameResult, IRefPhaserGame, PhaserGame } from "./PhaserGame";
import styles from "@/styles/Home.module.css";
import { Start } from "@/game/scenes/Start";
import StartSection from "@/sections/StartSection";
import IntroSection from "@/sections/IntroSection";
import LoadingSection from "@/sections/LoadingSection";
import { useRouter } from "next/router";
import ResizeContent from "@/components/ResizeContent";

enum Section {
    START,
    INTRODUCTION,
    GAME,
    LOADING,
}

function App() {
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    const [name, setName] = useState<string>("");
    const [currentSection, setCurrentSection] = useState(Section.START);
    const router = useRouter();

    const startGame = useCallback(() => {
        if (phaserRef.current) {
            window.scrollTo({ top: 0 });
            const scene = phaserRef.current.scene as Start;

            if (scene) {
                scene.playerName = name;
                scene.startGame();
                setCurrentSection(Section.GAME);
            }
        }
    }, [name]);

    const onGameover = async (result: GameResult) => {
        console.log("Game Over!", result);
        setCurrentSection(Section.LOADING);

        const response = await fetch("api/result", {
            method: "POST",
            body: JSON.stringify({
                name: result.name,
                score: result.score,
                items: result.items,
            }),
        });

        if (response.ok) {
            const { record } = await response.json();
            const id = record.xata_id;

            router.push(`result/${id}`);
        }
    };

    return (
        <>
            <div
                className={styles.gameContainer}
                style={{
                    visibility:
                        currentSection === Section.GAME ? "visible" : "hidden",
                }}
            >
                <PhaserGame ref={phaserRef} onGameover={onGameover} />
            </div>

            {currentSection === Section.START ? (
                <StartSection
                    onStartClicked={() =>
                        setCurrentSection(Section.INTRODUCTION)
                    }
                />
            ) : null}

            {currentSection === Section.INTRODUCTION ? (
                <IntroSection
                    name={name}
                    setName={setName}
                    onReadyClicked={startGame}
                />
            ) : null}

            {currentSection === Section.LOADING ? <LoadingSection /> : null}
        </>
    );
}

export default App;
