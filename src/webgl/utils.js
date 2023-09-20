function delay(millis, task, ...args) {
    let currentMillis = millis;
    const delayedTask = () => {
        currentMillis -= context.app.ticker.deltaMS;
        if (currentMillis <= 0) {
            task(...args);
            context.app.ticker.remove(delayedTask);
        }
    };
    context.app.ticker.add(delayedTask);
}

function resizeCanvas(canvas, ratio, padding) {
    const {width, height} = fitDimension(ratio, padding);
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    canvas.width = width * mainWindow.devicePixelRatio;
    canvas.height = height * mainWindow.devicePixelRatio;

    // >> quickfix todo replace with grid layout
    const {model, view} = engine.modelView;
    view.x = canvas.width / 2;
    view.y = canvas.height / 2;
    view.scale.set(0.88 * (canvas.width / (model.level.isLandscape ? model.level.width : 2 * model.level.width)));
    // <<
}

function fitDimension(ratio, padding = 0) {
    let {innerWidth: w, innerHeight: h} = mainWindow;
    w -= 2 * padding;
    h -= 2 * padding;
    if (w > h * ratio) {
        w = h * ratio;
    } else {
        h = w / ratio;
    }
    return {width: w, height: h};
}
