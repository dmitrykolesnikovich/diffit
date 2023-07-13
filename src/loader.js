PIXI.Assets.init({
    basePath: "../res"
});

async function loadTexture(levelId, name) {
    return await PIXI.Assets.load(`levels/${levelId}/images/${name}.jpg`);
}

async function loadFont(path) {
    await PIXI.Assets.load(path);
}
