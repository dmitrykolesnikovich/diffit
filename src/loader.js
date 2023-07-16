PIXI.Assets.init({
    basePath: "../res"
});

function loadLevel(levelId, complete) {
    (async function () {
        // fonts
        await PIXI.Assets.load('fonts/Filmotype_Major.otf');

        // level
        const levelJson = await PIXI.Assets.load(`levels/${levelId}/level.json`);
        const level = buildLevel(levelId, levelJson);

        // slots
        async function loadSlotTexture(slot) {
            slot.texture = await PIXI.Assets.load(`levels/${levelId}/images/${slot.name}.jpg`);
        }

        await loadSlotTexture(level.standardSlot);
        for (const slot of level.slots) {
            await loadSlotTexture(slot);
        }

        complete(level)
    })();
}
