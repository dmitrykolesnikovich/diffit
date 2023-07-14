const context = {
    app: null,
    game: null,
}

async function bootstrap(app) {
    context.app = app;
    await loadFont('fonts/Filmotype_Major.otf');
    await sync();
}

async function sync() {
    // 1. state
    if (context.game == null) {
        context.game = await buildGame();
    } else if (context.game.isLevelCompleted()) {
        alert(`Ура! Уровень ${context.game.level.id} пройден!`);
        context.game = await buildGame(context.game.level.id + 1);
    }

    // 2. ui
    const {layout, level, score, mistakes} = context.game;
    layout.scoreLabel.invalidateText(`${score}/${level.size}`);
    layout.mistakesLabel.invalidateText(mistakes);
}

function moveFailure(layer, event) {
    context.game.mistakes++;
    layer.addChild(new RedRectangle({x: event.x - 32, y: event.y - 32, width: 64, height: 64}))
    setTimeout(async () => await sync(), 30);
}

function moveSuccess(layer, slot) {
    context.game.score++;
    for (let area of slot.areas) {
        area.addChild(new GreenRectangle(slot))
    }
    setTimeout(async () => await sync(), 30);
}
