const game = {

    app: null,
    level: null,
    layout: null,
    score: 0,
    mistakes: 0,

    reset() {
        this.app.stage.removeChildren();
        this.level = null;
        this.layout = null;
        this.score = 0;
        this.mistakes = 0;
    },

    isDirty() {
        return this.level == null;
    },

    isLevelCompleted() {
        return !this.isDirty() && this.score >= this.level.size;
    },

}

async function sync() {
    if (game.isDirty()) {
        await play();
    } else if (game.isLevelCompleted()) {
        await playNextLevel();
    }
}

async function play(levelId = 1) {
    game.reset();

    const level = await buildLevel(levelId);
    const layout = await buildLayout(level);
    setupHitAreas(level, layout);

    game.level = level;
    game.layout = layout;
    game.app.stage.addChild(layout.invalidate());
}

function setupHitAreas(level, layout) {
    const layerA = layout.layerA;
    const layerB = layout.layerB;
    const slotsA = level.slotsA;
    const slotsB = level.slotsB;

    setupFailureArea(layerA, level)
    setupFailureArea(layerB, level)
    setupSuccessAreas(layerA, slotsA);
    setupSuccessAreas(layerA, slotsB);
    setupSuccessAreas(layerB, slotsA);
    setupSuccessAreas(layerB, slotsB);
}

function setupFailureArea(layer, level) {
    const failureArea = layer.addChild(new HitArea(level.layerSize));
    failureArea.on('click', (event) => moveFailure(layer, layer.toLocal(event.global)));
}

function setupSuccessAreas(layer, slots) {
    for (let slot of slots) {
        const successArea = layer.addChild(new HitArea(slot));
        successArea.on('click', (event) => {
            if (!slot.isDone) {
                event.stopPropagation()
                slot.isDone = true;
                moveSuccess(layer, slot);
            }
        });
        slot.areas.push(successArea);
    }
}
