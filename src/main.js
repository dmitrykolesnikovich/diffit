const context = {
    app: null,
    modelView: null,
}

// modelView
buildModelView = bindViewModel(buildModelView)
moveFailure = bindViewModel(moveFailure)
moveSuccess = bindViewModel(moveSuccess)

// app
initializeApplication(document.querySelector("#mainCanvas"));
goToLevel(1);
