import { Start } from "./scenes/Start";
import { AUTO, Game, Scale } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: AUTO,
    title: "Creative Expo 2025",
    description: "",
    parent: "game-container",
    width: 1080,
    height: 1920,
    backgroundColor: "#000000",
    pixelArt: false,
    scene: [Start],
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH,
    },
    physics: {
        default: "arcade",
        arcade: { gravity: { y: 0, x: 0 } },
    },
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
};

export default StartGame;

