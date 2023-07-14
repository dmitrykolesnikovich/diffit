(async function main() {
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
    await bootstrap(app);
}());
