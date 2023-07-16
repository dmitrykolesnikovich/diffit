PIXI.Assets.init({
    basePath: "../res"
});

function loadLevel(levelId, complete) {
    (async function () {
        await loadFont('fonts/Filmotype_Major.otf');
        const levelJson = await PIXI.Assets.load(`levels/${levelId}/level.json`);
        const level = buildLevel(levelId, levelJson);
        level.standardSlot.texture = await loadTexture(levelId, level.standardSlot.name);
        for (let slot of level.slots) {
            slot.texture = await loadTexture(levelId, slot.name);
        }
        complete(level)
    })();
}

async function loadFont(path) {
    await PIXI.Assets.load(path);
}

async function loadTexture(levelId, name) {
    return await PIXI.Assets.load(`levels/${levelId}/images/${name}.jpg`);
}
