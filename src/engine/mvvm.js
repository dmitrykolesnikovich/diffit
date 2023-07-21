class MVVM {

    modelView = null;
    _viewModel = null;
    _actionMap = {};

    constructor() {
        _bindProperties(this, this.updateViewModel.bind(this));
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

    updateViewModel() {
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
    const updateViewModel = engine.updateViewModel.bind(engine);
    if (context instanceof Function) {
        return _bindAction(context, updateViewModel);
    } else {
        _bindProperties(context, updateViewModel);
        return context;
    }
}

function TargetAction(target, action) {
    const {x = 0, y = 0, width, height} = target
    const object = new PIXI.Container()
    object.interactive = true;
    object.hitArea = new PIXI.Rectangle(x, y, width, height);
    object.on('pointerdown', (event) => {
        event.stopPropagation();
        const point = object.toLocal(event.global);
        const args = {target, action, object, point};
        engine.emit(action, args);
    });
    return object;
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
