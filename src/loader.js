PIXI.Assets.init({
    basePath: "../res"
});

async function loadGameResources() {
    await loadFont('fonts/Filmotype_Major.otf');
}

async function loadTexture(levelId, name) {
    return await PIXI.Assets.load(`levels/${levelId}/images/${name}.jpg`);
}

async function loadFont(path) {
    await PIXI.Assets.load(path);
}
