function updateViewModel() {
    resetViewModel();
    setupViewModel();
}

function resetViewModel() {
    const {model, view} = context.modelView;
    context.app.stage.removeChildren();
    view.successA.removeChildren();
    view.successB.removeChildren();
    view.scoreLabel.removeText();
    view.mistakesLabel.removeText();
}

function setupViewModel() {
    const {model, view} = context.modelView;
    const {failures, successA, successB, scoreLabel, mistakesLabel} = view;
    context.app.stage.addChild(view);

    // success
    for (let slot of model.successSlots) {
        successA.addChild(new GreenRectangle(slot));
        successB.addChild(new GreenRectangle(slot));
    }

    // failure
    for (let failurePoint of model.failurePoints) {
        failures.addChild(new RedCross(failurePoint));
    }

    // status
    scoreLabel.setupText(`${model.score}/${model.totalSlotCount}`);
    mistakesLabel.setupText(model.mistakesCount);
}
