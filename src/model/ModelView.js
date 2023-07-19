class ModelView {
    model;
    view;
}

function buildModelView(level) {
    const modelView = new ModelView();
    modelView.model = buildModel(level);
    modelView.view = buildView(level);
    initializeModelView(modelView)
    return modelView;
}

function initializeModelView(modelView) {
    const {model, view} = modelView;
    const {level} = model;
    const {layerA, layerB} = view;

    layerA.addChild(new HitArea(level, (event) => controller.emit('failure', event)));
    layerB.addChild(new HitArea(level, (event) => controller.emit('failure', event)));
    for (let slot of level.slots) {
        layerA.addChild(new HitArea(slot, (event) => controller.emit('success', event.target)));
        layerB.addChild(new HitArea(slot, (event) => controller.emit('success', event.target)));
    }
}
