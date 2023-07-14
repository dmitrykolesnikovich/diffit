PIXI.Assets.init({
    basePath: "../res"
});

async function loadLevel(levelId) {
    const levelJson = await PIXI.Assets.load(`levels/${levelId}/level.json`);
    const level = buildLevel(levelJson);
    level.id = levelId;
    return level;
}

async function loadTexture(levelId, name) {
    return await PIXI.Assets.load(`levels/${levelId}/images/${name}.jpg`);
}

async function loadFont(path) {
    await PIXI.Assets.load(path);
}
