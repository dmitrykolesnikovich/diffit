class Game {

    level = null;
    layout = null;
    score = 0;
    mistakes = 0;

    async constructor(levelId) {
        const level = await buildLevel(levelId % 5);
        const layout = await buildLayout(level);
        setupHitAreas(level, layout);

        this.level = level;
        this.layout = layout;
    }

    isLevelCompleted() {
        return this.score >= this.level.size;
    }

}

async function buildGame(levelId = 1) {
    const game = new Game(levelId);
    context.app.stage.removeChildren();
    context.app.stage.addChild(game.layout)
    return game;
}
