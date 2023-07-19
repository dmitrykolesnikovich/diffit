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

function buildLevel(levelId, levelJson) {
    const level = new Level();
    level.id = levelId;
    for (let slotJson of levelJson.slots) {
        const slot = buildSlot(levelId, slotJson);
        if (slot.layer === "standart") {
            level.standardSlot = slot;
        } else {
            level.slots.push(slot);
        }
    }
    return level;
}
