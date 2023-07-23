class ModelView {
    model;
    view;
}

function buildModelView(level) {
    const modelView = new ModelView();
    modelView.model = buildModel(level);
    modelView.view = buildView(level);
    initializeModelView(modelView)
    return modelView;
}
