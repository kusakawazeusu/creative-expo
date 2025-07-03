export class Background {
    constructor(scene) {
        this.scene = scene;
    }

    create() {
        const bg = this.scene.add.image(0, 0, "background").setOrigin(0, 0);
        const header = this.scene.add.image(0, -24, "header").setOrigin(0, 0);

        bg.setScrollFactor(0);
        header.setScrollFactor(0).setDepth(1);

        this.band1 = this.scene.add.image(30, 0, "band").setOrigin(0, 0);
        this.band2 = this.scene.add
            .image(30, -this.band1.height, "band")
            .setOrigin(0, 0);
        this.band3 = this.scene.add.image(970, 0, "band").setOrigin(0, 0);
        this.band4 = this.scene.add
            .image(970, -this.band1.height, "band")
            .setOrigin(0, 0);

        this.band1.setScrollFactor(0);
        this.band2.setScrollFactor(0);
        this.band3.setScrollFactor(0);
        this.band4.setScrollFactor(0);

        this.startLine = this.scene.add
            .image(160, 1500, "startLine")
            .setOrigin(0, 0);
        this.startLine.setScrollFactor(0);
    }

    update(speed) {
        this.band1.y += speed;
        this.band2.y += speed;
        this.band3.y += speed;
        this.band4.y += speed;

        this.startLine.y += speed;

        if (this.band1.y > this.band1.height) {
            this.band1.y = -this.band1.height;
        }
        if (this.band2.y > this.band1.height) {
            this.band2.y = -this.band1.height;
        }
        if (this.band3.y > this.band3.height) {
            this.band3.y = -this.band3.height;
        }
        if (this.band4.y > this.band4.height) {
            this.band4.y = -this.band4.height;
        }

        if (this.startLine > 400) {
            this.startLine.destroy();
        }
    }
}

