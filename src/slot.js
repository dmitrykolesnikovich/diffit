class Slot {
    layer;
    name;
    x;
    y;
    width;
    height;
    texture;
}

async function buildSlot(levelId, slotJson) {
    const slot = new Slot();
    const {level, name, x, y, width, height} = slotJson
    slot.level = level;
    slot.name = name;
    slot.x = x;
    slot.y = y;
    slot.width = width;
    slot.height = height;
    slot.texture = await loadTexture(levelId, slotJson.name);
    return slot;
}
