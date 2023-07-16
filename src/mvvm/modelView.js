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

    layerA.addChild(new HitArea(level, moveFailure));
    layerB.addChild(new HitArea(level, moveFailure));
    for (let slot of level.slots) {
        layerA.addChild(new HitArea(slot, moveSuccess));
        layerB.addChild(new HitArea(slot, moveSuccess));
    }
}
