function bind(action) {
    const isFunctionAsynchronous = action.constructor.name === 'AsyncFunction';
    if (isFunctionAsynchronous) {
        return function (...args) {
            action(...args).then((result) => {
                if (result instanceof ModelView) {
                    context.modelView = result;
                }
                updateViewModel();
            });
        }
    } else {
        return function (...args) {
            const result = action(...args);
            if (result instanceof ModelView) {
                context.modelView = result;
            }
            updateViewModel();
        }
    }
}
