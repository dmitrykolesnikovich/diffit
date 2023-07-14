let modelView = {
    model: null,
    view: null,
}

async function buildModelView(levelId) {
    const level = await loadLevel(levelId % 5);
    const model = buildModel(level);
    const view = await buildView(level);
    return {model, view};
}

function bindView(updateModel) {
    return async function (...args) {
        await updateModel(...args);
        await syncViewWithModel();
    }
}

async function syncViewWithModel() {
    const {model, view} = modelView;
    const {layerA, layerB, mainView, scoreLabel, mistakesLabel} = view;

    // success
    /*layerA.removeChildren();
    layerB.removeChildren();*/
    for (let slot of model.successSlots) {
        layerA.addChild(new GreenRectangle(slot));
        layerB.addChild(new GreenRectangle(slot));
    }

    // failure
    for (let failurePoint of model.failurePoints) {
        mainView.addChild(new RedRectangle({x: event.x - 32, y: event.y - 32, width: 64, height: 64}));
    }

    // status
    scoreLabel.invalidateText(`${model.score}/${model.totalSlotCount}`);
    mistakesLabel.invalidateText(model.mistakesCount);

    // next
    /*if (context.app.stage.getChildAt(0) !== view) {
        context.app.stage.removeChildren();
        context.app.stage.addChild(view);
    } else {
        await nextLevel();
    }*/
    context.app.stage.addChild(view);
}

/*actions*/

async function nextLevel() {
    if (modelView.model == null) {
        modelView = await buildModelView(1);
    } else if (modelView.model.isLevelCompleted()) {
        alert(`Ура! Уровень ${modelView.model.level.id} пройден!`);
        modelView = await buildModelView(modelView.model.level.id + 1);
    }

    /*const {model, view} = modelView;
    const {layerA, layerB} = view;
    const {level} = model;
    layerA.addChild(new HitArea(level, moveFailure));
    layerB.addChild(new HitArea(level, moveFailure));
    for (let slot of level.slots) {
        layerA.addChild(new HitArea(slot, moveSuccess));
        layerB.addChild(new HitArea(slot, moveSuccess));
    }*/
}

function moveFailure(layer, event) {
    modelView.model.failurePoints.push(event);
}

function moveSuccess(layer, slot) {
    modelView.model.successSlots.push(slot);
}
