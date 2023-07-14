function setupController(modelView) {
    const {model, view} = modelView
    const {layerA, layerB} = view;
    const {level} = model;
    layerA.addChild(new HitArea(level, moveFailure));
    layerB.addChild(new HitArea(level, moveFailure));
    for (let slot of level.slots) {
        layerA.addChild(new HitArea(slot, moveSuccess));
        layerB.addChild(new HitArea(slot, moveSuccess));
    }
}

async function firstLevel() {
    modelView = await buildModelView(1);
}

function moveFailure(level, event) {
    modelView.model.failurePoints.push(event);
}

function moveSuccess(slot, event) {
    modelView.model.successSlots.push(slot);
}
