export const loadImage = (src: string) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = (error) => reject(error);
    });
};

function getImageIndex(score: number) {
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

        const bgImage = (await loadImage(
            "/assets/result-bg.png"
        )) as HTMLImageElement;

        const footerImage = (await loadImage(
            "/assets/footer.png"
        )) as HTMLImageElement;

        const logoImage = (await loadImage(
            "/assets/logo.png"
        )) as HTMLImageElement;

        const scale = window.devicePixelRatio || 1;
        canvas.width = image.width * scale + 600;
        canvas.height = image.height * scale + 700;

        if (ctx) {
            ctx.scale(scale, scale);

            // 畫背景
            ctx.drawImage(bgImage, -100, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#0d5899";
            ctx.fillRect(
                0,
                image.height / 2 + 100,
                canvas.width,
                image.height / 2 + 300
            );

            const logoWidth = 176 * scale * 1.5;
            const logoHeight = 25 * scale * 1.5;
            ctx.drawImage(logoImage, 300, 30, logoWidth, logoHeight);

            const footerWidth = 120 * scale * 1.5;
            const footerHeight = 30 * scale * 1.5;
            ctx.drawImage(
                footerImage,
                360,
                image.height + 210,
                footerWidth,
                footerHeight
            );

            // 畫主圖
            ctx.drawImage(image, 150, 160, image.width, image.height);

            ctx.rotate((-5 * Math.PI) / 180);
            ctx.font = "140px Shrikhand-Regular";
            ctx.fillStyle = "white";
            ctx.strokeStyle = "#0d5899";
            ctx.lineWidth = 3;
            ctx.textAlign = "center";

            ctx.fillText(score.toString(), 350, 1230);
            ctx.strokeText(score.toString(), 350, 1230);

            ctx.rotate((10 * Math.PI) / 180);
            ctx.font = "40px Shrikhand-Regular";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";

            ctx.fillText(rank.toString(), 900, 1230);
        }
    }
}

