const context = {

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
    context.reset();

    //
    const level = await buildLevel(++context.levelId);
    const layout = await buildLayout(level);
    context.app.stage.addChild(layout);
    setupGame(level, layout);

    context.level = level;
    context.layout = layout;
    context.layout.invalidate()
}

function setupGame(level, layout) {
    const layerA = layout.layerA;
    const layerB = layout.layerB;

    setupFailureArea(layerA, level)
    setupFailureArea(layerB, level)
    setupSuccessAreas(layerA, level.slotsA);
    setupSuccessAreas(layerA, level.slotsB);
    setupSuccessAreas(layerB, level.slotsA);
    setupSuccessAreas(layerB, level.slotsB);
}

function setupFailureArea(layer, level) {
    const failureArea = layer.addChild(new HitArea(level.layerSize));
    failureArea.on('click', (event) => {
        miss(layer, layer.toLocal(event.global));
    });
}

function setupSuccessAreas(layer, slots) {
    for (let slot of slots) {
        const successArea = layer.addChild(new HitArea(slot));
        successArea.on('click', (event) => {
            if (!slot.isDone) {
                event.stopPropagation()
                slot.isDone = true;
                hit(layer, slot);
            }
        });
        slot.areas.push(successArea);
    }

}

function miss(layer, event) {
    layer.addChild(new RedRectangle({x: event.x - 32, y: event.y - 32, width: 64, height: 64}))
    context.mistakes++;
    context.layout.invalidate();
}

function hit(layer, slot) {
    context.score++;
    context.layout.invalidate();
    for (let area of slot.areas) {
        area.addChild(new GreenRectangle(slot))
    }

    console.log(`score: ${context.score} (slot: ${slot.name})`);
    if (context.score >= context.level.size) {
        setTimeout(async () => await win(context.level), 30);
    }
}

async function win(level) {
    alert(`Уровень ${level.id} пройден!`);
    await nextLevel();
}
