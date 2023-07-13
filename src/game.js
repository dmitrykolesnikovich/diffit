const game = {

    app: null,
    level: null,
    levelId: 0,
    score: 0,
    mistakes: 0,
    layout: null,

    reset() {
        this.app.stage.removeChildren();
        this.level = null;
        if (this.levelId >= 5) {
            this.levelId = 0
        }
        this.score = 0;
        this.mistakes = 0;
        this.layout = null;
    }

}

async function nextLevel() {
    game.reset();

    //
    const level = await buildLevel(++game.levelId);
    const layout = await buildLayout(level);
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
        failure(layer, layer.toLocal(event.global));
    });
}

function setupSuccessAreas(layer, slots) {
    for (let slot of slots) {
        const successArea = layer.addChild(new HitArea(slot));
        successArea.on('click', (event) => {
            if (!slot.isDone) {
                event.stopPropagation()
                slot.isDone = true;
                success(layer, slot);
            }
        });
        slot.areas.push(successArea);
    }
}

function failure(layer, event) {
    layer.addChild(new RedRectangle({x: event.x - 32, y: event.y - 32, width: 64, height: 64}))
    game.mistakes++;
    game.layout.invalidate();
}

function success(layer, slot) {
    game.score++;
    game.layout.invalidate();
    for (let area of slot.areas) {
        area.addChild(new GreenRectangle(slot))
    }

    console.log(`score: ${game.score} (slot: ${slot.name})`);
    if (game.score >= game.level.size) {
        setTimeout(async () => await win(game.level), 30);
    }
}

async function win(level) {
    alert(`Уровень ${level.id} пройден!`);
    await nextLevel();
}
