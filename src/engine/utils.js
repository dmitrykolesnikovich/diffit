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
