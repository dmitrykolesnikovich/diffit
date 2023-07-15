async function firstLevel() {
    modelView = await buildModelView(1);
}

async function nextLevel() {
    const {model} = modelView;
    if (model.isLevelCompleted()) {
        alert(`Ура! Уровень ${model.level.id} пройден!`);
        modelView = await buildModelView(model.level.id + 1);
    }
}

function moveFailure(event) {
    const {model} = modelView;
    model.failurePoints.push(event);
}

function moveSuccess(event) {
    const {model} = modelView;
    model.successSlots.push(event.target);
}

/*binding*/

firstLevel = bindViewModel(firstLevel)
nextLevel = bindViewModel(nextLevel)
moveFailure = bindViewModel(moveFailure)
moveSuccess = bindViewModel(moveSuccess)
