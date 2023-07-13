async function move() {
    if (game.isLevelCompleted()) {
        alert(`Уровень ${game.level.id} пройден!`);
    }
    if (game.isDirty() || game.isLevelCompleted()) {
        await setupGame();
        game.layout.invalidate()
    }
}

function moveSuccess(layer, event) {
    layer.addChild(new RedRectangle({x: event.x - 32, y: event.y - 32, width: 64, height: 64}))
    game.mistakes++;
    game.layout.invalidate();
}

function moveFailure(layer, slot) {
    game.score++;
    game.layout.invalidate();
    for (let area of slot.areas) {
        area.addChild(new GreenRectangle(slot))
    }

    console.log(`score: ${game.score} (slot: ${slot.name})`);
    setTimeout(async () => await move(), 30);
}
