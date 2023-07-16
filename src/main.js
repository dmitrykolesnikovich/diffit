const context = {
    app: null,
    modelView: null,
}

// mvvm
buildModelView = bind(buildModelView)
moveFailure = bind(moveFailure)
moveSuccess = bind(moveSuccess)

// app
initializeApplication(document.querySelector("#mainCanvas"));
goToLevel(1);
