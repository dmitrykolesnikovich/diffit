function initializeModelView({model, view}) {
    const {level} = model;
    const {layerA, layerB} = view;

    layerA.addChild(new PixiAction(level, 'failure'));
    layerB.addChild(new PixiAction(level, 'failure'));
    for (let slot of level.slots) {
        layerA.addChild(new PixiAction(slot, 'success'));
        layerB.addChild(new PixiAction(slot, 'success'));
    }
}
