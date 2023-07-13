const game = {

    app: null,
    level: null,
    levelId: 0,
    layout: null,
    score: 0,
    mistakes: 0,

    reset() {
        this.level = null;
        if (this.levelId >= 5) {
            this.levelId = 0
        }
        this.layout = null;
        this.score = 0;
        this.mistakes = 0;
    },

    isDirty() {
        return this.level == null && this.levelId === 0 && this.layout == null && this.score === 0 && this.mistakes === 0;
    },

    isLevelCompleted() {
        return !this.isDirty() && this.score >= this.level.size;
    }

}

async function setupGame() {
    game.reset();

    const level = await buildLevel(++game.levelId);
    const layout = await buildLayout(level);
    game.app.stage.removeChildren();
    game.app.stage.addChild(layout);
    setupHitAreas(level, layout);

    game.level = level;
    game.layout = layout;
    game.layout.invalidate()
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
    failureArea.on('click', (event) => {
        moveSuccess(layer, layer.toLocal(event.global));
    });
}

function setupSuccessAreas(layer, slots) {
    for (let slot of slots) {
        const successArea = layer.addChild(new HitArea(slot));
        successArea.on('click', (event) => {
            if (!slot.isDone) {
                event.stopPropagation()
                slot.isDone = true;
                moveFailure(layer, slot);
            }
        });
        slot.areas.push(successArea);
    }
}
