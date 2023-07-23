const context = bindViewModel({
    app: null,
    root: null,
});

window.onload = function () {
    const PADDING = 16;
    const RATIO = 9.0 / 16.0;

    const canvas = document.createElement('canvas');
    canvas.classList.add('root');
    document.querySelector("#app").appendChild(canvas);
    context.app = new PIXI.Application({
        background: 'white',
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        view: canvas,
        resizeTo: canvas,
        sharedTicker: true,
    });
    context.root = canvas;
    window.onresize = () => resizeCanvas(canvas, RATIO, PADDING);
    window.onorientationchange = () => resizeCanvas(canvas, RATIO, PADDING);

    engine.emit('showLevel', {levelId: 5});
}
