class MvvmEngine {

    modelView = null;
    _viewModel = null;
    _actionMap = {};

    constructor() {
        _bindProperties(this, this._updateViewModel.bind(this));
    }

    on(event, action) {
        let actions = this._actionMap[event];
        if (actions == null) {
            actions = [];
            this._actionMap[event] = actions;
        }
        actions.push(action);
    }

    emit(event, ...args) {
        const actions = this._actionMap[event];
        if (actions != null) {
            for (let action of actions) {
                _executeAction(action, this._updateViewModel.bind(this), ...args);
            }
        }
    }

    _updateViewModel() {
        if (this.modelView != null) {
            this._viewModel(this.modelView);
            window.dispatchEvent(new Event('resize'));
        }
    }

}

const engine = new MvvmEngine();

function registerModelViewContext(context) {
    _bindProperties(context, engine._updateViewModel.bind(engine));
    return context;
}

function registerViewModel(viewModel) {
    engine._viewModel = viewModel;
}

/*internals*/

function _bindProperties(object, complete) {
    for (const prop of Object.keys(object)) {
        if (prop.startsWith('_')) continue;

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
