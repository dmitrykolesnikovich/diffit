const context = {

    app: null,
    level: null,
    levelId: 0,
    score: 0,
    mistakes: 0,
    scoreLabel: null,
    mistakesLabel: null,

    reset() {
        this.app.stage.removeChildren();
        this.level = null;
        if (this.levelId >= 5) {
            this.levelId = 0
        }
        this.score = 0;
        this.mistakes = 0;
        this.scoreLabel = null;
        this.mistakesLabel = null;
    }

}

async function nextLevel() {
    context.reset();
    const level = await buildLevel(++context.levelId);
    context.level = level;
    const layout = await buildLayout(level);
    context.app.stage.addChild(layout);
    setupGame(level, layout);
    updateStatus();
}

function miss(layer, event) {
    layer.addChild(new RedRectangle({x: event.x - 32, y: event.y - 32, width: 64, height: 64}))
    context.mistakes++;
    updateStatus();
}

function hit(layer, slot) {
    context.score++;
    updateStatus();
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

function updateStatus() {
    context.scoreLabel.invalidateText(`${context.score}/${context.level.size}`);
    context.mistakesLabel.invalidateText(context.mistakes);
}
