function bind(object) {

    function complete() {
        if (context.modelView != null) {
            updateViewModel();
        }
    }

    if (object instanceof Function) {
        return bindAction(object, complete)
    } else {
        bindProperties(object, complete)
        return object;
    }

}
