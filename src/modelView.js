let modelView = {
    model: null,
    view: null,
}

async function buildModelView(levelId) {
    const level = await loadLevel(levelId % 5);
    const model = buildModel(level)
    const view = await buildView(level);
    return {model, view};
}

async function syncViewWithModel() {
    const {model, view} = modelView;
    const {level, score, mistakes} = model;
    const {layerA, layerB, failuresView} = view;

    for (let slot of modelView.successSlots) {
        layerA.addChild(new GreenRectangle(slot))
        layerB.addChild(new GreenRectangle(slot))
    }

    for (let failurePoint of modelView.failurePoints) {
        failuresView.addChild(new RedRectangle({x: event.x - 32, y: event.y - 32, width: 64, height: 64}))
    }

    view.scoreLabel.invalidateText(`${score}/${level.size}`);
    view.mistakesLabel.invalidateText(mistakes);

    await nextLevel();
    if (context.app.stage.getChildAt(0) !== view) {
        context.app.stage.removeChildren();
        context.app.stage.addChild(view)
    }
}

async function nextLevel() {
    if (modelView.model == null) {
        modelView = await buildModelView(1);
    } else if (modelView.model.isLevelCompleted()) {
        alert(`Ура! Уровень ${modelView.model.level.id} пройден!`);
        modelView = await buildModelView(modelView.model.level.id + 1);
    }
    setupController(modelView)
}

function moveFailure(layer, event) {
    modelView.model.failurePoints.push(event)
}

function moveSuccess(layer, slot) {
    modelView.model.successSlots.push(slot)
}
