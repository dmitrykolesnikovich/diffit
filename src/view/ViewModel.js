engine.on('updateViewModel', updateViewModel);

function updateViewModel(modelView) {
    resetViewModel(modelView);
    setupViewModel(modelView);
}

function resetViewModel({model, view}) {
    context.app.stage.removeChildren();
    view.layerA.foreground.removeChildren();
    view.layerB.foreground.removeChildren();
    view.scoreLabel.removeText();
    view.mistakesLabel.removeText();
}

function setupViewModel({model, view}) {
    const {layerA, layerB, scoreLabel, mistakesLabel} = view;
    context.app.stage.addChild(view);

    // success
    for (let slot of model.successSlots) {
        layerA.foreground.addChild(new GreenRectangle(slot));
        layerB.foreground.addChild(new GreenRectangle(slot));
    }

    // status
    scoreLabel.setupText(`${model.score}/${model.total}`);
    mistakesLabel.setupText(model.mistakesCount);
}
