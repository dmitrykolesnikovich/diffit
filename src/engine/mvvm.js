class MVVM {

    modelView = null;
    _viewModel = null;
    _actionMap = {};

    constructor() {
        _bindPublicProperties(this, this._updateViewModel.bind(this));
    }

    on(action, listener) {
        const listeners = this._actionMap[action];
        if (listeners != null) {
            listeners.push(listener);
        } else {
            this._actionMap[action] = [listener];
        }
    }

    emit(action, event) {
        const listeners = this._actionMap[action];
        if (listeners != null) {
            for (let listener of listeners) {
                listener(event);
            }
        }
    }

    _updateViewModel() {
        if (this.modelView != null) {
            // noinspection JSValidateTypes
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
    const updateViewModel = engine._updateViewModel.bind(engine);
    if (context instanceof Function) {
        return _bindAction(context, updateViewModel);
    } else {
        _bindPublicProperties(context, updateViewModel);
        return context;
    }
}

function TargetAction(target, action) {
    const {x = 0, y = 0, width, height} = target
    const object = new PIXI.Container()
    object.interactive = true;
    object.hitArea = new PIXI.Rectangle(x, y, width, height);
    object.on('pointerdown', (pointer) => {
        pointer.stopPropagation();
        const point = object.toLocal(pointer.global);
        const event = {target, action, object, point};
        engine.emit(action, event);
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
            complete();
        }
    }
}

function _bindPublicProperties(object, complete) {
    for (const key of Object.keys(object)) {
        if (key.startsWith('_')) continue;

        let oldValue = object[key];
        let newValue = oldValue;
        Object.defineProperty(object, key, {
            configurable: true,
            enumerable: true,
            get: () => {
                return newValue;
            },
            set: (value) => {
                if (value === newValue) return;

                oldValue = newValue;
                newValue = value;
                complete();
            },
        });
    }
}
