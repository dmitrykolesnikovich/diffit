function showLevel(levelId) {
    loadLevel(levelId, (level) => {
        context.modelView = buildModelView(level);
    });
}

function moveFailure(point) {
    const {model} = context.modelView;
    model.failurePoints.push(point);
}

function moveSuccess(slot) {
    const {model} = context.modelView;
    model.successSlots.push(slot);
    events.emit('checkNextLevel');
}

function checkNextLevel() {
    const {model} = context.modelView;
    if (model.isLevelCompleted()) {
        delay(200, () => {
            alert(`Ура! Уровень ${model.level.id} пройден!`);
            events.emit('showLevel', (model.level.id + 1) % 5);
        });
    }
}
