let modelView = {
    model: null,
    view: null,
};

async function buildModelView(levelId) {
    const level = await loadLevel(levelId % 5);
    const model = buildModel(level);
    const view = await buildView(level);
    return {model, view};
}

function bindView(updateModel) {
    return async function (...args) {
        await updateModel(...args);
        await updateView();
    }
}

async function updateView() {
    const {model, view} = modelView;
    const {successA, successB, mainView, scoreLabel, mistakesLabel} = view;

    // success
    successA.removeChildren();
    successB.removeChildren();
    for (let slot of model.successSlots) {
        successA.addChild(new GreenRectangle(slot));
        successB.addChild(new GreenRectangle(slot));
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
