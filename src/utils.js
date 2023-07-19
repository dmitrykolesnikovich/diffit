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

function bindProperties(object, complete) {
    for (const prop of Object.keys(object)) {
        let oldValue = object[prop];
        let newValue = oldValue;

        Object.defineProperty(object, prop, {
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
