moveFailure = bindViewModel(moveFailure)
moveSuccess = bindViewModel(moveSuccess)

/*actions*/

function goToLevel(levelId) {
    loadLevel(levelId, buildModelView)
}

function nextLevel() {
    const {model} = context.modelView;
    if (model.isLevelCompleted()) {
        alert(`Ура! Уровень ${model.level.id} пройден!`);
        goToLevel((model.level.id + 1) % 5);
    }
}

function moveFailure(event) {
    const {model} = context.modelView;
    model.failurePoints.push(event);
}

function moveSuccess(event) {
    const {model} = context.modelView;
    model.successSlots.push(event.target);
}
