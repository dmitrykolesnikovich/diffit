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

class Slot {

    name;
    texture;
    x;
    y;
    width;
    height;

    isDone = false;
    areas = [];

}

async function buildLevel(levelId) {
    const level = new Level();
    level.id = levelId;

    const levelJson = await PIXI.Assets.load(`levels/${levelId}/level.json`);
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

async function buildSlot(levelId, slotJson) {
    const slot = new Slot();
    slot.name = slotJson.name;
    slot.texture = await loadTexture(levelId, slotJson.name);
    slot.x = slotJson.x;
    slot.y = slotJson.y;
    slot.width = slotJson.width;
    slot.height = slotJson.height;
    return slot;
}
