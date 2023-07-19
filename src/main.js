const context = {
    app: null,
    modelView: null,
}

// mvvm
buildModelView = bind(buildModelView)
moveFailure = bind(moveFailure)
moveSuccess = bind(moveSuccess)

// app
context.app = buildApplication(document.querySelector("#mainCanvas"));
window.onresize = () => context.app.onResize();
window.onorientationchange = () => context.app.onResize();
goToLevel(5);
