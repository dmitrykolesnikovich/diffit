function bindViewModel(updateModelView) {
    return async function (...args) {
        await updateModelView(...args);
        resetViewModel(modelView);
        await setupViewModel(modelView);
    }
}

function resetViewModel({model, view}) {
    context.app.stage.removeChildren();
    context.app.stage.addChild(view);
    view.successA.removeChildren();
    view.successB.removeChildren();
    view.scoreLabel.invalidateText()
    view.mistakesLabel.invalidateText()
}

async function setupViewModel({model, view}) {
    const {failures, successA, successB, scoreLabel, mistakesLabel} = view;

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
    scoreLabel.invalidateText(`${model.score}/${model.totalSlotCount}`);
    mistakesLabel.invalidateText(model.mistakesCount);
}
