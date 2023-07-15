function bindViewModel(updateModelView) {
    return async function (...args) {
        await updateModelView(...args);
        resetViewModel();
        await setupViewModel();
    }
}

function resetViewModel() {
    context.app.stage.removeChildren();
    context.app.stage.addChild(modelView.view);
    view.successA.removeChildren();
    view.successB.removeChildren();
    view.scoreLabel.invalidateText()
    view.mistakesLabel.invalidateText()
}

async function setupViewModel() {
    const {model, view} = modelView;
    const {successA, successB, mainView, scoreLabel, mistakesLabel} = view;

    // success
    for (let slot of model.successSlots) {
        successA.addChild(new GreenRectangle(slot));
        successB.addChild(new GreenRectangle(slot));
    }

    // failure
    for (let failurePoint of model.failurePoints) {
        mainView.addChild(new RedRectangle({x: failurePoint.x - 32, y: failurePoint.y - 32, width: 64, height: 64}));
    }

    // status
    scoreLabel.invalidateText(`${model.score}/${model.totalSlotCount}`);
    mistakesLabel.invalidateText(model.mistakesCount);
}
