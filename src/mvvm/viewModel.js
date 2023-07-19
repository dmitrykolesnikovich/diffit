function updateViewModel(modelView = context.modelView) {
    resetViewModel(modelView);
    setupViewModel(modelView);
}

function resetViewModel({model, view}) {
    context.app.stage.removeChildren();
    view.successA.removeChildren();
    view.successB.removeChildren();
    view.scoreLabel.removeText();
    view.mistakesLabel.removeText();
}

function setupViewModel({model, view}) {
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
