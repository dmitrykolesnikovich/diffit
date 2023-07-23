PIXI.Assets.init({
    basePath: "../res"
});

async function loadLevel(levelId) {
    // fonts
    await PIXI.Assets.load('fonts/Filmotype_Major.otf');

    // level
    const levelJson = await PIXI.Assets.load(`levels/${levelId}/level.json`);
    const level = buildLevel(levelId, levelJson);

    // slots
    async function loadSlotTexture(slot) {
        PIXI.Assets.add(slot.id, `levels/${levelId}/images/${slot.name}.jpg`);
        await PIXI.Assets.load(slot.id);
    }

    await loadSlotTexture(level.standardSlot);
    for (const slot of level.slots) {
        await loadSlotTexture(slot);
    }
    return level;
}
