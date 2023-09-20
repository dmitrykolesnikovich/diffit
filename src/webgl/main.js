const context = bindViewModel({
    app: null,
    root: null,
});

mainWindow.onload = function () {
    const PADDING = 16;
    const RATIO = 9.0 / 16.0;

    const canvas = document.createElement('canvas');
    canvas.classList.add('root');
    document.querySelector("#app").appendChild(canvas);
    context.app = new PIXI.Application({
        background: 'white',
        antialias: true,
        resolution: mainWindow.devicePixelRatio || 1,
        view: canvas,
        resizeTo: canvas,
        sharedTicker: true,
    });
    context.root = canvas;
    mainWindow.onresize = () => resizeCanvas(canvas, RATIO, PADDING);
    mainWindow.onorientationchange = () => resizeCanvas(canvas, RATIO, PADDING);

    engine.emit('showLevel', {levelId: 5});
}
