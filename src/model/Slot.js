class Slot {
    id;
    layer;
    name;
    x;
    y;
    width;
    height;
}

function buildSlot(levelId, slotJson) {
    const slot = new Slot();
    const {layer, name, x, y, width, height} = slotJson
    slot.id = `level${levelId}/${slot.name}`;
    slot.layer = layer;
    slot.name = name;
    slot.x = x;
    slot.y = y;
    slot.width = width;
    slot.height = height;
    return slot;
}
