class Level {

    id;
    layerImage;
    layerSize = {
        width: 0,
        height: 0,
    };
    slotsA = [];
    slotsB = [];

    get isLandscape() {
        return this.layerSize.width > this.layerSize.height;
    }

    get size() {
        return this.slotsA.length + this.slotsB.length;
    }

}

async function buildLevel(levelId, levelJson) {
    const level = new Level();
    level.id = levelId;
    for (let slotJson of levelJson.slots) {
        switch (slotJson.layer) {
            case "standart": {
                level.layerImage = await loadTexture(levelId, slotJson.name);
                level.layerSize = {
                    width: slotJson.width,
                    height: slotJson.height
                };
                break;
            }
            case "LayerA": {
                level.slotsA.push(await buildSlot(levelId, slotJson));
                break;
            }
            case "LayerB": {
                level.slotsB.push(await buildSlot(levelId, slotJson));
                break;
            }
        }
    }
    return level;
}
