class Level {
    id;
    standardSlot;
    slots = [];
    width;
    height;
    isLandscape;
}

function buildLevel(levelId, levelJson) {
    const level = new Level();
    level.id = levelId;
    for (let slotJson of levelJson.slots) {
        const slot = buildSlot(levelId, slotJson);
        if (slot.layer === "standart") {
            level.standardSlot = slot;
            level.width = slot.width;
            level.height = slot.height;
            level.isLandscape = slot.width > slot.height;
        } else {
            level.slots.push(slot);
        }
    }
    return level;
}
