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
