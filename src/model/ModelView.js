class ModelView {
    model;
    view;
}

function buildModelView(level, layout) {
    const modelView = new ModelView();
    modelView.model = buildModel(level);
    modelView.view = buildView(level, layout);
    initializeModelView(modelView)
    return modelView;
}

function initializeModelView({model, view}) {
    const {level} = model;
    const {layerA, layerB} = view;

    layerA.addChild(new HitArea(level, (event) => engine.emit('failure', event)));
    layerB.addChild(new HitArea(level, (event) => engine.emit('failure', event)));
    for (let slot of level.slots) {
        layerA.addChild(new HitArea(slot, (event) => engine.emit('success', event.target)));
        layerB.addChild(new HitArea(slot, (event) => engine.emit('success', event.target)));
    }
}
