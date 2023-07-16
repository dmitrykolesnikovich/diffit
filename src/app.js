function initializeApplication() {
    const canvas = document.querySelector("#mainCanvas")
    context.app = new PIXI.Application({
        background: 'white',
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        view: canvas,
        resizeTo: canvas,
    });
    window.onresize = () => resizeApplication(canvas, 9.0 / 16.0);
}

function resizeApplication(canvas, ratio) {
    const {model, view} = context.modelView;

    // 1. actual ratio
    const emptySpace = 2 * parseInt(canvas.style.padding);
    const actualRatio = (window.innerWidth - emptySpace) / (window.innerHeight - emptySpace);

    // 2. actual size
    let height;
    let width;
    if (ratio <= actualRatio) {
        height = window.innerHeight - emptySpace;
        width = height * ratio;
    } else {
        width = window.innerWidth - emptySpace;
        height = width / ratio;
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
