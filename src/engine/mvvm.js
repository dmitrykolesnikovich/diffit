class MvvmEngine {

    _modelViewContext = null;
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
        const modelView = this._modelViewContext.modelView;
        if (modelView != null) {
            this._viewModel.call(null, modelView)
            window.dispatchEvent(new Event('resize'));
        }
    }

}

const engine = new MvvmEngine();

function registerModelViewContext(context) {
    _bindProperties(context, engine._updateViewModel.bind(engine))
    engine._modelViewContext = context;
    return context;
}

function registerViewModel(viewModel) {
    engine._viewModel = viewModel;
}

/*internals*/

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
