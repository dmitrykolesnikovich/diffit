engine.on('showLevel', bindViewModel(showLevel));
engine.on('failure', bindViewModel(moveFailure));
engine.on('success', bindViewModel(moveSuccess));

async function showLevel(levelId) {
    const level = await loadLevel(levelId);
    engine.modelView = buildModelView(level, LevelGridLayout);
}

function moveFailure(event) {
    const {model} = engine.modelView;
    model.mistakesCount++;
    _showRedCrossOnMoveFailure(event);
}

function moveSuccess(slot) {
    const {model} = engine.modelView;
    model.successSlots.push(slot);
    _checkNextLevelOnMoveSuccess();
}

/*internals*/

function _showRedCrossOnMoveFailure(event) {
    const layer = event.area.parent;
    const redCross = new RedCross(event);
    layer.addChild(redCross);
    delay(220, () => layer.removeChild(redCross));
}

function _checkNextLevelOnMoveSuccess() {
    const {model} = engine.modelView;
    if (model.isLevelCompleted()) {
        delay(220, () => {
            alert(`Ура! Уровень ${model.level.id} пройден!`);
            engine.emit('showLevel', (model.level.id + 1) % 5);
        });
    }
}
