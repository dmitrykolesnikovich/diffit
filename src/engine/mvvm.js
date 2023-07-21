class MvvmEngine {

    _context = null;
    actionMap = {};

    on(event, action) {
        let actions = this.actionMap[event];
        if (actions == null) {
            actions = [];
            this.actionMap[event] = actions;
        }
        actions.push(action);
    }

    emit(event, ...args) {
        const actions = this.actionMap[event];
        if (actions != null) {
            for (let action of actions) {
                action(...args);
            }
        }
    }

}

const engine = new MvvmEngine();

function bind(context) {
    if (context instanceof Function) {
        return _bindAction(context, _updateViewModel)
    } else {
        _bindProperties(context, _updateViewModel)
        if (context.modelView !== undefined) {
            engine._context = context;
        }
        return context;
    }
}

/*internals*/

function _updateViewModel() {
    const context = engine._context;
    if (context.modelView != null) {
        engine.emit('updateViewModel', context.modelView)
        window.dispatchEvent(new Event('resize'));
    }
}

function _bindAction(action, complete) {
    const isFunctionAsynchronous = action.constructor.name === 'AsyncFunction';
    if (isFunctionAsynchronous) {
        return function (...args) {
            action(...args).then(complete);
        }
    } else {
        return function (...args) {
            action(...args);
            complete()
        }
    }
}

function _bindProperties(object, complete) {
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
