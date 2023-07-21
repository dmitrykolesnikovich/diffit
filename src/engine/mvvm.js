function bind(object) {

    function updateViewModelIfExists() {
        if (context.modelView != null) {
            updateViewModel(context.modelView);
            window.dispatchEvent(new Event('resize'));
        }
    }

    if (object instanceof Function) {
        return bindAction(object, updateViewModelIfExists)
    } else {
        bindProperties(object, updateViewModelIfExists)
        return object;
    }

}
