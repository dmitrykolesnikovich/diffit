class Level {

    id;
    standardSlot = null;
    slots = [];

    get width() {
        return this.standardSlot.width;
    }

    get height() {
        return this.standardSlot.height;
    }

    get isLandscape() {
        return this.width > this.height;
    }

}

async function buildLevel(levelId, levelJson) {
    const level = new Level();
    level.id = levelId;
    for (let slotJson of levelJson.slots) {
        switch (slotJson.layer) {
            case "standart": {
                level.standardSlot = buildSlot(levelId, slotJson);
                break;
            }
            default: {
                level.slots.push(await buildSlot(levelId, slotJson));
                break;
            }
        }
    }
    return level;
}
