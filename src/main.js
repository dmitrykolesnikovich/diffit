const context = {
    app: null,
};

(async function bootstrap() {
    const canvas = document.querySelector("#mainCanvas")
    context.app = new PIXI.Application({
        background: 'white',
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        view: canvas,
        resizeTo: canvas,
    });
    window.onresize = resizeView;
    await main();
}());

async function main() {
    await loadFont('fonts/Filmotype_Major.otf');
    await firstLevel();
}
