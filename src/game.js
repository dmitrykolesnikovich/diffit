function setupGame(level, layout) {
    const layerA = layout.layerA;
    const layerB = layout.layerB;

    setupFailureArea(layerA, level)
    setupFailureArea(layerB, level)
    setupSuccessAreas(layerA, level.slotsA);
    setupSuccessAreas(layerA, level.slotsB);
    setupSuccessAreas(layerB, level.slotsA);
    setupSuccessAreas(layerB, level.slotsB);
}

function setupFailureArea(layer, level) {
    const failureArea = layer.addChild(new HitArea(level.layerSize));
    failureArea.on('click', (event) => {
        event = layer.toLocal(event.global);
        miss(layer, event);
    });
}

function setupSuccessAreas(layer, slots) {
    for (let slot of slots) {
        const successArea = layer.addChild(new HitArea(slot));
        successArea.on('click', (event) => {
            if (!slot.isDone) {
                event.stopPropagation()
                slot.isDone = true;
                hit(layer, slot);
            }
        });
        slot.areas.push(successArea);
    }

}
