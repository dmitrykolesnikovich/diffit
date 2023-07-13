(async function main() {
    // engine
    const canvas = document.querySelector("#mainCanvas")
    initializeCanvas(canvas);
    const app = new PIXI.Application({
        background: 'white',
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        view: canvas,
        resizeTo: canvas,
    });
    document.body.appendChild(app.view);

    // game
    game.app = app;
    await loadGameResources();
    await move();
}());
