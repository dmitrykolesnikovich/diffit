const CANVAS_RATIO = 9.0 / 16.0;

function setupCanvasResizeListener(canvas) {
    function resizeCanvas() {
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
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
}

function setupViewResizeListener(view, level) {
    function resizeView() {
        const width = level.isLandscape ? level.width : 2 * level.width;
        const scale = context.canvasWidth / width;
        view.scale.set(scale * 0.77);
        view.x = context.canvasWidth / 2;
        view.y = context.canvasHeight / 2;
    }

    window.addEventListener('resize', resizeView);
    resizeView();
}
