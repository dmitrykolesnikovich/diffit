const context = bindViewModel({
    app: null
});

window.onload = function () {
    const PADDING = 16;
    const RATIO = 9.0 / 16.0;

    const canvas = document.querySelector("#mainCanvas");
    context.app = new PIXI.Application({
        background: 'white',
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        view: canvas,
        resizeTo: canvas,
        sharedTicker: true,
    });
    window.onresize = () => resizeApplication(RATIO, PADDING);
    window.onorientationchange = () => resizeApplication(RATIO, PADDING);

    engine.emit('showLevel', 5);
}
