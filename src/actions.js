function moveFailure(layer, event) {
    layer.addChild(new RedRectangle({x: event.x - 32, y: event.y - 32, width: 64, height: 64}))
    game.mistakes++;
    game.layout.invalidate();
}

function moveSuccess(layer, slot) {
    game.score++;
    for (let area of slot.areas) {
        area.addChild(new GreenRectangle(slot))
    }
    game.layout.invalidate();

    setTimeout(async () => await sync(), 30);
}

async function playNextLevel() {
    alert(`Ура! Уровень ${game.level.id} пройден!`);
    let nextLevelId = game.level.id + 1;
    if (nextLevelId > 5) {
        nextLevelId = 1
    }
    await play(nextLevelId);
}
