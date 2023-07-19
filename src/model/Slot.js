class Slot {
    layer;
    name;
    x;
    y;
    width;
    height;
    textureId;
}

function buildSlot(levelId, slotJson) {
    const slot = new Slot();
    const {layer, name, x, y, width, height} = slotJson
    slot.layer = layer;
    slot.name = name;
    slot.x = x;
    slot.y = y;
    slot.width = width;
    slot.height = height;
    slot.textureId = `level${levelId}/${slot.name}`;
    return slot;
}
