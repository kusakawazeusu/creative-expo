export const loadImage = (src: string) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = (error) => reject(error);
    });
};

export const texts = [
    "",
    "你的IP正在悄悄萌芽，\n雖然還在起步階段，\n但潛力無限，未來只差一次亮相的機會！",
    "你擁有讓人一眼記住的魅力，\n剛登場就吸引目光，\n是人氣竄升的閃耀新星！",
    "你懂得經營角色個性與社群魅力，\n無論走到哪都能聚集死忠粉，\n打造你的專屬IP信仰圈！",
    "你不只是創作者，\n更是掌握市場節奏的操盤手，\nIP商轉、跨域合作樣樣精準命中！",
    "你就是傳說本身，\nIP早已超越品牌，\n成為文化的一部分！",
];

type ACCESSORY = {
    type: "star" | "flower";
    x: number;
    y: number;
    size: number;
};

export const accessories: ACCESSORY[][] = [
    [],
    [
        { type: "flower", x: 32, y: 68, size: 24 },
        { type: "flower", x: 12, y: 168, size: 40 },
        { type: "flower", x: 148, y: 196, size: 24 },
        { type: "flower", x: 160, y: 40, size: 40 },
    ],
    [
        { type: "star", x: 40, y: 10, size: 40 },
        { type: "star", x: 72, y: 4, size: 25 },
        { type: "star", x: 72, y: 180, size: 40 },
        { type: "star", x: 164, y: 68, size: 36 },
    ],
    [
        { type: "star", x: 12, y: 32, size: 24 },
        { type: "star", x: 12, y: 80, size: 48 },
        { type: "star", x: 12, y: 164, size: 24 },
        { type: "star", x: 140, y: 172, size: 40 },
    ],
    [
        { type: "star", x: 120, y: 8, size: 24 },
        { type: "star", x: 140, y: 20, size: 40 },
        { type: "star", x: 12, y: 168, size: 32 },
        { type: "star", x: 148, y: 190, size: 28 },
    ],
    [
        { type: "star", x: 132, y: 8, size: 24 },
        { type: "star", x: 152, y: 20, size: 40 },
        { type: "star", x: 12, y: 108, size: 32 },
        { type: "star", x: 162, y: 172, size: 28 },
    ],
];

export function getImageIndex(score: number) {
    let imageIndex = 1;
    if (score > 100 && score < 201) {
        imageIndex = 2;
    }
    if (score > 200 && score < 301) {
        imageIndex = 3;
    }
    if (score > 300 && score < 401) {
        imageIndex = 4;
    }
    if (score > 400) {
        imageIndex = 5;
    }

    return imageIndex;
}

export async function drawMainImage(
    canvas: HTMLCanvasElement | null,
    score: number,
    rank: number
) {
    const imageIndex = getImageIndex(score);

    if (canvas) {
        const ctx = canvas.getContext("2d");
        const image = (await loadImage(
            `/assets/result/${imageIndex}.png`
        )) as HTMLImageElement;

        const scale = window.devicePixelRatio || 1;
        canvas.width = image.width * scale;
        canvas.height = image.height * scale;

        if (ctx) {
            ctx.scale(scale, scale);
            ctx.drawImage(image, 0, 0, image.width, image.height);

            ctx.textAlign = "center";
            ctx.font = "bold 36px 'Noto Sans TC'";
            ctx.fillStyle = "#0d5899";

            texts[imageIndex].split("\n").forEach((t, index) => {
                ctx.fillText(t, 410, 1220 + index * 54);
            });

            ctx.rotate((-5 * Math.PI) / 180);
            ctx.font = "140px Shrikhand-Regular";
            ctx.fillStyle = "white";
            ctx.strokeStyle = "#0d5899";
            ctx.lineWidth = 3;
            ctx.textAlign = "center";

            ctx.fillText(score.toString(), 210, 1060);
            ctx.strokeText(score.toString(), 210, 1060);

            ctx.rotate((10 * Math.PI) / 180);
            ctx.font = "40px Shrikhand-Regular";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";

            ctx.fillText(rank.toString(), 730, 1080);
        }
    }
}

export async function drawDownloadImage(
    canvas: HTMLCanvasElement | null,
    score: number,
    rank: number
) {
    const imageIndex = getImageIndex(score);

    if (canvas) {
        const ctx = canvas.getContext("2d");
        const image = (await loadImage(
            `/assets/result/${imageIndex}.png`
        )) as HTMLImageElement;
        const character = (await loadImage(
            `/assets/result/ch${imageIndex}.png`
        )) as HTMLImageElement;
        const bgImage = (await loadImage(
            "/assets/download-bg.png"
        )) as HTMLImageElement;

        const footerImage = (await loadImage(
            "/assets/footer.png"
        )) as HTMLImageElement;

        const logoImage = (await loadImage(
            "/assets/logo.png"
        )) as HTMLImageElement;

        const scale = window.devicePixelRatio || 1;
        canvas.width = (image.width + 200) * scale;
        canvas.height = (image.height + 300) * scale;

        if (ctx) {
            ctx.scale(scale, scale);

            // 畫背景
            ctx.drawImage(bgImage, 0, 0, image.width + 200, image.height + 300);
            // ctx.fillStyle = "#0d5899";
            // ctx.fillRect(
            //     0,
            //     image.height / 2 + 100,
            //     canvas.width,
            //     image.height / 2 + 300
            // );

            const logoWidth = 176 * 3;
            const logoHeight = 25 * 3;
            ctx.drawImage(logoImage, 250, 30, logoWidth, logoHeight);

            const footerWidth = 120 * 3;
            const footerHeight = 30 * 3;
            ctx.drawImage(
                footerImage,
                310,
                image.height + 160,
                footerWidth,
                footerHeight
            );

            // 畫主圖
            ctx.drawImage(image, 100, 120, image.width, image.height);
            ctx.drawImage(
                character,
                imageIndex === 5 ? 200 : 240,
                290,
                character.width,
                character.height
            );

            ctx.textAlign = "center";
            ctx.font = "bold 36px 'Noto Sans TC'";
            ctx.fillStyle = "#0d5899";

            texts[imageIndex].split("\n").forEach((t, index) => {
                ctx.fillText(t, 500, 1340 + index * 54);
            });

            ctx.rotate((-5 * Math.PI) / 180);
            ctx.font = "140px Shrikhand-Regular";
            ctx.fillStyle = "white";
            ctx.strokeStyle = "#0d5899";
            ctx.lineWidth = 3;
            ctx.textAlign = "center";

            ctx.fillText(score.toString(), 300, 1190);
            ctx.strokeText(score.toString(), 300, 1190);

            ctx.rotate((10 * Math.PI) / 180);
            ctx.font = "40px Shrikhand-Regular";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";

            ctx.fillText(rank.toString(), 850, 1190);
        }
    }
}

