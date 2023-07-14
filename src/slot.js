class Slot {
    layer;
    name;
    texture;
    x;
    y;
    width;
    height;
}

async function buildSlot(levelId, slotJson) {
    const slot = new Slot();
    slot.level = slotJson.level;
    slot.name = slotJson.name;
    slot.texture = await loadTexture(levelId, slotJson.name);
    slot.x = slotJson.x;
    slot.y = slotJson.y;
    slot.width = slotJson.width;
    slot.height = slotJson.height;
    return slot;
}
