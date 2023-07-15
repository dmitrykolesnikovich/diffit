let modelView = {
    model: null,
    view: null,
};

async function buildModelView(levelId) {
    const level = await loadLevel(levelId % 5);
    const model = buildModel(level);
    const view = await buildView(level);
    const modelView = {model, view};
    initializeModelView(modelView)
    return modelView;
}

function initializeModelView({model, view}) {
    const {level} = model;
    const {layerA, layerB} = view;

    layerA.addChild(new HitArea(level, moveFailure));
    layerB.addChild(new HitArea(level, moveFailure));
    for (let slot of level.slots) {
        layerA.addChild(new HitArea(slot, moveSuccess));
        layerB.addChild(new HitArea(slot, moveSuccess));
    }
}
