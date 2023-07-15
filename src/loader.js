PIXI.Assets.init({
    basePath: "../res"
});

async function loadFont(path) {
    await PIXI.Assets.load(path);
}

async function loadLevel(levelId) {
    let levelJson = await PIXI.Assets.load(`levels/${levelId}/level.json`);
    return buildLevel(levelId, levelJson);
}

async function loadTexture(levelId, name) {
    return await PIXI.Assets.load(`levels/${levelId}/images/${name}.jpg`);
}
