function bindViewModel(updateModelView) {
    const isFunctionAsynchronous = updateModelView.constructor.name === 'AsyncFunction';
    if (isFunctionAsynchronous) {
        return function (...args) {
            updateModelView(...args).then((result) => {
                if (result instanceof ModelView) {
                    context.modelView = result;
                }
                updateViewModel();
            });
        }
    } else {
        return function (...args) {
            const result = updateModelView(...args);
            if (result instanceof ModelView) {
                context.modelView = result;
            }
            updateViewModel();
        }
    }
}
