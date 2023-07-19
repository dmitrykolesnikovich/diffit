class Events {

    mapping = {};

    on(event, listener) {
        let listeners = this.mapping[event];
        if (listeners == null) {
            listeners = [];
            this.mapping[event] = listeners;
        }
        listeners.push(listener);
    }

    emit(event, ...args) {
        const listeners = this.mapping[event];
        if (listeners != null) {
            for (let listener of listeners) {
                listener(...args);
            }
        }
    }

}
