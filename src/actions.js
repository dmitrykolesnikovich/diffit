function goToLevel(levelId) {
    loadLevel(levelId, (level) => {
        context.modelView = buildModelView(level);
    });
}

function moveFailure(event) {
    const {model} = context.modelView;
    model.failurePoints.push(event);
}

function moveSuccess(event) {
    const {model} = context.modelView;
    model.successSlots.push(event.target);
    delay(200, nextLevel);
}

function nextLevel() {
    const {model} = context.modelView;
    if (model.isLevelCompleted()) {
        alert(`Ура! Уровень ${model.level.id} пройден!`);
        goToLevel((model.level.id + 1) % 5);
    }
}
