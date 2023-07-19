function showLevel(levelId) {
    loadLevel(levelId, (level) => {
        context.modelView = buildModelView(level);
    });
}

function moveFailure(event) {
    const {model} = context.modelView;
    model.mistakesCount++;

    const layer = event.area.parent;
    const redCross = new RedCross(event);
    layer.addChild(redCross);
    delay(220, () => layer.removeChild(redCross));
}

function moveSuccess(slot) {
    const {model} = context.modelView;
    model.successSlots.push(slot);
    _checkNextLevel();
}

/*internals*/

function _checkNextLevel() {
    const {model} = context.modelView;
    if (model.isLevelCompleted()) {
        delay(220, () => {
            alert(`Ура! Уровень ${model.level.id} пройден!`);
            events.emit('showLevel', (model.level.id + 1) % 5);
        });
    }
}
