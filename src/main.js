const context = {
    app: null
}

(async function bootstrap() {
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
    context.app = app;
    await main();
}());

async function main() {
    // bind
    nextLevel = bindView(nextLevel)
    moveFailure = bindView(moveFailure)
    moveSuccess = bindView(moveSuccess)

    // load
    await loadFont('fonts/Filmotype_Major.otf');

    //
    await nextLevel()
}
