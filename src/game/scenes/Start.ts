import { Item } from "@/game/objects/Item";
import { Background } from "@/game/objects/Background";
import { EventBus } from "@/game/EventBus";

const LANES = [290, 540, 800];

export class Start extends Phaser.Scene {
    isGameStart: boolean;
    level: number;
    seconds: number;
    score: number;
    background: Background;
    mainTimer: Phaser.Time.TimerEvent;
    scoreTimer: Phaser.Time.TimerEvent;
    scoreText: Phaser.GameObjects.Text & { isTweening?: boolean };
    player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody & {
        lane?: number;
    };
    items: Phaser.Physics.Arcade.Group;
    eatItems: { [key: number]: number };
    playerName: string;

    constructor() {
        super("Start");

        this.isGameStart = false;
        this.seconds = 0;
        this.score = 0;
        this.eatItems = {};
    }

    preload() {
        this.load.image("background", "assets/background.png");
        this.load.image("header", "assets/header.png");
        this.load.image("band", "assets/band.png");
        this.load.image("countdown3", "assets/countdown-3.png");
        this.load.image("countdown2", "assets/countdown-2.png");
        this.load.image("countdown1", "assets/countdown-1.png");
        this.load.image("startLine", "assets/start-line.png");
        this.load.image("gameover", "assets/gameover.png");
        this.load.spritesheet("character", "assets/character.png", {
            frameWidth: 274,
            frameHeight: 325,
        });
        this.load.spritesheet("chest", "assets/chest.png", {
            frameWidth: 64,
            frameHeight: 64,
        });

        Array.from(Array(13).keys())
            .map((n) => n + 1)
            .forEach((index) => {
                this.load.image(`item${index}`, `assets/items/${index}.png`);
            });

        this.load.image("plus5", "assets/plus5.png");
    }

    create() {
        this.background = new Background(this);
        this.background.create();

        this.mainTimer = this.time.addEvent({
            delay: 1000,
            loop: true,
            paused: true,
            callback: () => this.updateEverySecond(),
        });

        this.scoreTimer = this.time.addEvent({
            delay: 500,
            loop: true,
            paused: true,
            callback: () => this.addScore(1, 1),
        });

        this.scoreText = this.add
            .text(540, 260, "0", {
                // fill: "#FFFFFF",
                fontSize: 120,
                fontFamily: "Shrikhand-Regular",
            })
            .setOrigin(0.5, 0.5)
            .setDepth(2)
            .setPadding(10);
        this.scoreText.isTweening = false; // 判斷是否正在執行動畫

        // Add player sprite sheet
        this.player = this.physics.add.sprite(LANES[1], 1700, "character");
        this.player.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("character", {
                start: 1,
                end: 22,
            }),
            frameRate: 30,
            repeat: -1,
        });

        this.player.anims.create({
            key: "gameover",
            frames: this.anims.generateFrameNumbers("character", {
                start: 0,
                end: 0,
            }),
            frameRate: 1,
            repeat: 0,
        });
        this.player.play("run");
        this.player.setDepth(1);
        this.player.lane = 1;

        // Set click/touch area
        const leftHitBox = this.add
            .rectangle(140, 0, 280, this.scale.height)
            .setOrigin(0, 0)
            .setInteractive();

        leftHitBox.on("pointerdown", () => this.moveCharacter(0));

        const centerHitBox = this.add
            .rectangle(420, 0, 240, this.scale.height)
            .setOrigin(0, 0)
            .setInteractive();

        centerHitBox.on("pointerdown", () => this.moveCharacter(1));

        const rightHitBox = this.add
            .rectangle(680, 0, 260, this.scale.height)
            .setOrigin(0, 0)
            .setInteractive();

        rightHitBox.on("pointerdown", () => this.moveCharacter(2));

        // Create chests
        this.items = this.physics.add.group();

        this.physics.add.overlap(
            this.player,
            this.items,
            this.onHitItem,
            undefined,
            this
        );

        const cheat = this.add
            .rectangle(0, 0, 100, 100)
            .setOrigin(0, 0)
            .setInteractive();

        cheat.on("pointerdown", () => this.addScore(100, 1));

        EventBus.emit("current-scene-ready", this);
    }

    startGame() {
        this.showCountdownAnimation();

        setTimeout(() => {
            this.isGameStart = true;
            this.mainTimer.paused = false;
            this.scoreTimer.paused = false;
        }, 3000);

        const createItemInterval = this.time.addEvent({
            delay: 3000,
            loop: true,
            callback: () => {
                this.createNewItem();
                (createItemInterval.delay as any) = getItemGenerateSpeed(
                    this.seconds
                );
            },
        });
    }

    onHitItem(player: any, item: any) {
        if (
            player.lane === item.lane &&
            item.y - player.y > -60 &&
            !item.isConsumed
        ) {
            if (item.isDanger) {
                this.gameover();
            } else {
                this.addScore(5, 1.6);
                item.playPlusAnimation();
                this.eatItems[item.itemIndex] =
                    (this.eatItems[item.itemIndex] || 0) + 1;
            }

            item.consum();
        }
    }

    showCountdownAnimation() {
        [3, 2, 1].forEach((number, index) => {
            const countdown = this.add
                .image(540, 1100, `countdown${number}`)
                .setOrigin(0.5, 0.5)
                .setAlpha(0);
            this.tweens.add({
                targets: countdown,
                delay: 1000 * index,
                scale: 2,
                alpha: [1, 0],
                duration: 1000,
                ease: "Cubic",
            });
        });
    }

    createNewItem() {
        const laneIndex = Phaser.Math.RND.between(0, 2);
        const itemIndex = Phaser.Math.RND.between(1, 13);
        const x = LANES[laneIndex];

        const item = new Item(this, x, -50, itemIndex, laneIndex);
        this.items.add(item);
    }

    moveCharacter(laneIndex: number) {
        if (!this.isGameStart) {
            return false;
        }

        this.tweens.add({
            targets: this.player,
            x: LANES[laneIndex],
            duration: 200,
            ease: "Sine",
        });
        this.player.lane = laneIndex;
    }

    gameover() {
        this.isGameStart = false;
        this.mainTimer.paused = true;
        this.scoreTimer.paused = true;
        this.player.play("gameover");

        const gameover = this.add.image(540, 0, "gameover").setOrigin(0.5, 0.5);

        this.tweens.add({
            targets: gameover,
            delay: 500,
            y: 1100,
            duration: 1000,
            ease: "Bounce",
        });

        this.time.addEvent({
            delay: 5000,
            callback: () => {
                EventBus.emit("gameover", {
                    items: this.eatItems,
                    score: this.score,
                    name: this.playerName,
                });
            },
        });
    }

    addScore(increment = 0, scale = 1.2) {
        this.score += increment;
        this.scoreText.setText(String(this.score));

        if (!this.scoreText.isTweening) {
            this.scoreText.isTweening = true;
            this.tweens.add({
                targets: this.scoreText,
                scale,
                duration: 100,
                ease: "Cubic",
                yoyo: true,
                persist: false,
                onComplete: () => {
                    this.scoreText.isTweening = false;
                },
            });
        }
    }

    updateEverySecond() {
        this.seconds += 1;

        this.updatePlayerSpeed(getSpeed(this.seconds) * 2);
    }

    updatePlayerSpeed(speed: number) {
        this.player.anims.msPerFrame = 1000 / speed;
    }

    update() {
        const speed = this.isGameStart ? getSpeed(this.seconds) : 0;

        this.background.update(speed);
        this.items.children.entries.forEach((item) => item.update(speed));
    }
}

function getSpeed(second: number) {
    return Math.min(15 + second, 40);
}

function getItemGenerateSpeed(second: number) {
    return Math.max(1000 - second * 15, 400);
}

