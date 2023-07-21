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

    layerA.addChild(new TargetAction(level, 'failure'));
    layerB.addChild(new TargetAction(level, 'failure'));
    for (let slot of level.slots) {
        layerA.addChild(new TargetAction(slot, 'success'));
        layerB.addChild(new TargetAction(slot, 'success'));
    }
}
