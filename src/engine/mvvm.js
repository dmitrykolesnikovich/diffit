function bind(object) {

    function updateViewModelIfExists() {
        if (context.modelView != null) {
            updateViewModel();
        }
    }

    if (object instanceof Function) {
        return bindAction(object, updateViewModelIfExists)
    } else {
        bindProperties(object, updateViewModelIfExists)
        return object;
    }

}
