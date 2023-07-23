engine.on('showLevel', bindViewModel(showLevel));
engine.on('success', bindViewModel(moveSuccess));
engine.on('failure', bindViewModel(moveFailure));

async function showLevel(event) {
    context.root.style.visibility = 'hidden';
    const level = await loadLevel(event.levelId);
    engine.modelView = buildModelView(level);
    context.root.style.visibility = 'visible';
}

function moveSuccess(event) {
    const {model} = engine.modelView;
    const slot = event.target;
    model.successSlots.push(slot);
    _checkNextLevelOnMoveSuccess();
}

function moveFailure(event) {
    const {model} = engine.modelView;
    model.mistakesCount++;
    _showRedCrossOnMoveFailure(event);
}

/*internals*/

function _showRedCrossOnMoveFailure(event) {
    const layer = event.object.parentNode;
    const redCross = createFailMark(event.point);
    layer.appendChild(redCross);
    setTimeout(() => layer.removeChild(redCross), 220);
}

function _checkNextLevelOnMoveSuccess() {
    const {model} = engine.modelView;
    if (model.hasMaxScore()) {
        setTimeout(() => {
            alert(`Ура! Уровень ${model.level.id} пройден!`);
            engine.emit('showLevel', {levelId: model.level.id % 5 + 1});
        }, 220);
    }
}
