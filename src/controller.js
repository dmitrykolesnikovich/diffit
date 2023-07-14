async function setupMvc() {
    modelView = await buildModelView(1);

    const {model, view} = modelView;
    const {layerA, layerB} = view;
    const {level} = model;

    layerA.addChild(new HitArea(level, moveFailure));
    layerB.addChild(new HitArea(level, moveFailure));
    for (let slot of level.slots) {
        layerA.addChild(new HitArea(slot, moveSuccess));
        layerB.addChild(new HitArea(slot, moveSuccess));
    }
}

function moveFailure(event) {
    modelView.model.failurePoints.push(event);
}

function moveSuccess(event) {
    modelView.model.successSlots.push(event.target);
}

/*bindings*/

setupMvc = bindView(setupMvc)
moveFailure = bindView(moveFailure)
moveSuccess = bindView(moveSuccess)
