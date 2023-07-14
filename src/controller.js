function setupController(level, view) {
    const layerA = view.layerA;
    const layerB = view.layerB;
    const slotsA = level.slotsA;
    const slotsB = level.slotsB;

    setupSuccessAreas(layerA, slotsA);
    setupSuccessAreas(layerA, slotsB);
    setupSuccessAreas(layerB, slotsA);
    setupSuccessAreas(layerB, slotsB);
}

function setupSuccessAreas(layer, slots) {
    for (let slot of slots) {
        const successArea = layer.addChild(new HitArea(slot));
        successArea.on('click', (event) => {
            if (!slot.isDone) {
                event.stopPropagation()
                slot.isDone = true;
                moveSuccess(layer, slot);
            }
        });
        slot.areas.push(successArea);
    }
}

function SuccessArea(slot) {
    const successArea = layer.addChild(new HitArea(slot));
    successArea.on('click', (event) => {
        if (moveSuccess(slot)) {
            event.stopPropagation();
        }
    });
}
