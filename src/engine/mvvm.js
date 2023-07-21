class MvvmEngine {

    _viewModel = null;
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
                _executeAction(action, this._updateViewModel.bind(this), ...args);
            }
        }
    }

    _updateViewModel() {
        const modelView = context.modelView;
        if (modelView != null) {
            this._viewModel(modelView);
            window.dispatchEvent(new Event('resize'));
        }
    }

}

const engine = new MvvmEngine();

const context = _registerModelViewContext({
    app: null,
    modelView: null,
});

function registerViewModel(viewModel) {
    engine._viewModel = viewModel;
}

/*internals*/

function _registerModelViewContext(context) {
    _bindProperties(context, engine._updateViewModel.bind(engine))
    return context;
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

function _executeAction(action, complete, ...args) {
    const isFunctionAsynchronous = action.constructor.name === 'AsyncFunction';
    if (isFunctionAsynchronous) {
        action(...args).then(complete);
    } else {
        action(...args);
        complete()
    }
}
