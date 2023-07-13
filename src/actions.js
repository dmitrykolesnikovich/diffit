function moveFailure(layer, event) {
    game.mistakes++;
    layer.addChild(new RedRectangle({x: event.x - 32, y: event.y - 32, width: 64, height: 64}))
    setTimeout(async () => await sync(), 30);
}

function moveSuccess(layer, slot) {
    game.score++;
    for (let area of slot.areas) {
        area.addChild(new GreenRectangle(slot))
    }
    setTimeout(async () => await sync(), 30);
}
