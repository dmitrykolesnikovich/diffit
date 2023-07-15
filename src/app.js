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
    window.onresize = () => resizeApplication(canvas);
}

function resizeApplication(canvas) {
    const CANVAS_RATIO = 9.0 / 16.0;
    const {model, view} = modelView;

    // 1. actual ratio
    const emptySpace = 2 * parseInt(canvas.style.padding);
    const actualRatio = (window.innerWidth - emptySpace) / (window.innerHeight - emptySpace);

    // 2. actual size
    let height;
    let width;
    if (CANVAS_RATIO <= actualRatio) {
        height = window.innerHeight - emptySpace;
        width = height * CANVAS_RATIO;
    } else {
        width = window.innerWidth - emptySpace;
        height = width / CANVAS_RATIO;
    }

    // 3. apply
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;

    const canvasWidth = parseFloat(canvas.style.width) + 2 * parseFloat(canvas.style.padding);
    const canvasHeight = parseFloat(canvas.style.height) + 2 * parseFloat(canvas.style.padding);
    const scale = canvasWidth / (model.level.isLandscape ? model.level.width : 2 * model.level.width);
    view.scale.set(scale * 0.77);
    view.x = canvasWidth / 2;
    view.y = canvasHeight / 2;
}
