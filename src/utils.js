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
    let delayMS = millis;
    const delayWrapper = () => {
        delayMS -= context.app.ticker.deltaMS;
        if (delayMS <= 0) {
            runnable.call(scope, ...args);
            context.app.ticker.remove(delayWrapper);
        }
    };
    context.app.ticker.add(delayWrapper);
    return delayWrapper;
}

function bindAction(action, complete) {
    const isFunctionAsynchronous = action.constructor.name === 'AsyncFunction';
    if (isFunctionAsynchronous) {
        return function (...args) {
            action(...args).then();
        }
    } else {
        return function (...args) {
            action(...args);
            complete()
        }
    }
}

function bindProperties(obj, complete) {
    for (const prop of Object.keys(obj)) {
        let oldValue = obj[prop];
        let newValue = oldValue;

        Object.defineProperty(obj, prop, {
            configurable: true,
            enumerable: true,
            get: () => {
                return newValue;
            },
            set: (value) => {
                if (value === newValue) {
                    return;
                }

                oldValue = newValue;
                newValue = value;
                complete();
            },
        });
    }
}
