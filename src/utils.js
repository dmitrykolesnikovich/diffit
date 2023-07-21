function delay(millis, runnable, scope, ...args) {
    let current = millis;
    const task = () => {
        current -= context.app.ticker.deltaMS;
        if (current <= 0) {
            runnable.call(scope, ...args);
            context.app.ticker.remove(task);
        }
    };
    context.app.ticker.add(task);
}

function resizeCanvas(canvas, ratio, padding) {
    const {width, height} = fitDimension(ratio, padding);
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;

    const {model, view} = engine.modelView;
    view.x = canvas.width / 2;
    view.y = canvas.height / 2;
    view.scale.set(0.88 * (canvas.width / (model.level.isLandscape ? model.level.width : 2 * model.level.width))); // quickfix todo drop
}

function fitDimension(ratio, padding = 0) {
    let {innerWidth: w, innerHeight: h} = window;
    w -= 2 * padding;
    h -= 2 * padding;
    if (w > h * ratio) {
        w = h * ratio;
    } else {
        h = w / ratio;
    }
    return {width: w, height: h};
}
