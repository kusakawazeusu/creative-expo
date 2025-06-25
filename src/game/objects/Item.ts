import { GameObjects } from "phaser";

export class Item extends GameObjects.Sprite {
    itemIndex: number;
    scene: Phaser.Scene;
    isConsumed: boolean;
    isDanger: boolean;
    lane: number;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        itemIndex: number,
        laneIndex: number
    ) {
        super(scene, x, y, `item${itemIndex}`);

        this.itemIndex = itemIndex;
        this.scene = scene;
        this.isConsumed = false;
        this.isDanger = itemIndex > 10;
        this.lane = laneIndex;

        scene.add.existing(this);
    }

    playPlusAnimation() {
        const plus5 = this.scene.add
            .image(this.x, this.y, "plus5")
            .setOrigin(0.5, 0.5)
            .setScale(2)
            .setDepth(2);
        this.alpha = 0;

        this.scene.tweens.add({
            targets: plus5,
            scale: 2.5,
            alpha: 0.5,
            y: "-=50",
            duration: 500,
            ease: "Cubic",
            onComplete: () => {
                plus5.destroy();
                this.destroy();
            },
        });
    }

    consum() {
        this.isConsumed = true;
    }

    update(speed = 5) {
        if (!this.isConsumed) {
            this.y += speed;
        }

        if (this.y > this.scene.scale.height * 2) {
            this.destroy();
        }
    }
}

