const context = {
    app: null,
}

function initializeApplication() {
    const canvas = document.querySelector("#mainCanvas")
    context.app = new PIXI.Application({
        background: 'white',
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        view: canvas,
        resizeTo: canvas,
    });
    window.onresize = resizeView;
}
