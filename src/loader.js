PIXI.Assets.init({
    basePath: "../res"
});

async function loadLevel(levelId) {
    let levelJson = await PIXI.Assets.load(`levels/${levelId}/level.json`);
    return buildLevel(levelId, levelJson);
}

async function loadTexture(levelId, name) {
    return await PIXI.Assets.load(`levels/${levelId}/images/${name}.jpg`);
}

async function loadFont(path) {
    await PIXI.Assets.load(path);
}

function bindView(updateModel) {
    return async function (...args) {
        await updateModel(...args);
        await syncViewWithModel();
    }
}
