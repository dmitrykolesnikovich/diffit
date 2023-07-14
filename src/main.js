const context = {
    app: null,
    get canvasWidth() {
        const canvas = this.app.view;
        return parseFloat(canvas.style.width) + 2 * parseFloat(canvas.style.padding);
    },
    get canvasHeight() {
        const canvas = this.app.view;
        return parseFloat(canvas.style.height) + 2 * parseFloat(canvas.style.padding);
    }
};

(async function bootstrap() {
    const canvas = document.querySelector("#mainCanvas")
    setupCanvasResizeListener(canvas);
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
    await loadFont('fonts/Filmotype_Major.otf');
    await setupMvc();
}
