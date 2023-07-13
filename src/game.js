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
    const failure = layer.addChild(new Area(level.layerSize));
    failure.on('click', (event) => {
        event = layer.toLocal(event.global);
        miss(layer, event);
    });
}

function setupSuccessAreas(layer, slots) {
    for (let slot of slots) {
        const success = layer.addChild(new Area(slot));
        if (isDebugEnabled) {
            success.addChild(RedArea(slot));
        }
        success.on('click', (event) => {
            if (!slot.isDone) {
                event.stopPropagation()
                slot.isDone = true;
                hit(layer, slot);
            }
        });
        slot.areas.push(success);
    }

}

const isDebugEnabled = false;
