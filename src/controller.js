function setupController(level, view) {
    const layerA = view.layerA;
    const layerB = view.layerB;
    const slotsA = level.slotsA;
    const slotsB = level.slotsB;

    setupFailureArea(layerA, level)
    setupFailureArea(layerB, level)
    setupSuccessAreas(layerA, slotsA);
    setupSuccessAreas(layerA, slotsB);
    setupSuccessAreas(layerB, slotsA);
    setupSuccessAreas(layerB, slotsB);
}

function setupFailureArea(layer, level) {
    const failureArea = layer.addChild(new HitArea(level.layerSize));
    failureArea.on('click', (event) => moveFailure(layer, layer.toLocal(event.global)));
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

function bindModelView(updateModel) {
    return async function (...args) {
        await updateModel(...args);
        await syncViewWithModel();
    }
}
