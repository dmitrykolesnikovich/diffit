class Game {

    level;
    layout;
    score = 0;
    mistakes = 0;

    constructor(level, layout) {
        this.level = level;
        this.layout = layout;
    }

    isLevelCompleted() {
        return this.score >= this.level.size;
    }

}

async function buildGame(levelId = 1) {
    const level = await loadLevel(levelId % 5);
    const layout = await buildLayout(level);
    setupHitAreas(level, layout);
    const game = new Game(level, layout);
    context.app.stage.removeChildren();
    context.app.stage.addChild(game.layout)
    return game;
}
