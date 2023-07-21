class ModelView {
    model;
    view;
}

class MVVM {

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
                action(...args);
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

const engine = new MVVM();

function registerViewModel(viewModel) {
    engine._viewModel = viewModel;
}

function bindViewModel(context) {
    if (context instanceof Function) {
        return _bindAction(context, engine._updateViewModel.bind(engine));
    } else {
        _bindProperties(context, engine._updateViewModel.bind(engine));
        return context;
    }
}

/*internals*/

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
