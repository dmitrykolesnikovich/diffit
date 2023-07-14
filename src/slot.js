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
