function bindViewModel(updateModelView) {
    return async function (...args) {
        const oldView = modelView.view;
        await updateModelView(...args);
        const newView = modelView.view;
        if (oldView !== newView) {
            context.app.stage.removeChild(oldView);
            context.app.stage.addChild(oldView);
        }
        resetViewModel();
        await setupViewModel();
    }
}

function resetViewModel() {
    const {view} = modelView;
    view.scoreLabel.invalidateText()
    view.mistakesLabel.invalidateText()
    view.successA.removeChildren();
    view.successB.removeChildren();
}

async function setupViewModel() {
    const {model, view} = modelView;
    const {successA, successB, mainView, scoreLabel, mistakesLabel} = view;

    // success
    successB.removeChildren();
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
