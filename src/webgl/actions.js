engine.on('showLevel', bindViewModel(showLevel));
engine.on('failure', bindViewModel(moveFailure));
engine.on('success', bindViewModel(moveSuccess));

async function showLevel(event) {
    context.root.style.visibility = 'hidden';
    const level = await loadLevel(event.levelId);
    engine.modelView = buildModelView(level);
    context.root.style.visibility = 'visible';
}

function moveFailure(event) {
    const {model} = engine.modelView;
    model.mistakesCount++;
    _showRedCrossOnMoveFailure(event);
}

function moveSuccess(event) {
    const {model} = engine.modelView;
    const slot = event.target;
    model.successSlots.push(slot);
    _checkNextLevelOnMoveSuccess();
}

/*internals*/

function _showRedCrossOnMoveFailure(event) {
    const layer = event.object.parent;
    const redCross = new RedCross(event.point);
    layer.addChild(redCross);
    delay(220, () => layer.removeChild(redCross));
}

function _checkNextLevelOnMoveSuccess() {
    const {model} = engine.modelView;
    if (model.hasMaxScore()) {
        delay(220, () => {
            alert(`Ура! Уровень ${model.level.id} пройден!`);
            engine.emit('showLevel', {levelId: model.level.id % 5 + 1});
        });
    }
}
