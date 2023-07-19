const context = {
    app: null,
    modelView: null,
}

// mvvm
buildModelView = bind(buildModelView)
moveFailure = bind(moveFailure)
moveSuccess = bind(moveSuccess)

// app
context.app = buildApplication({
    canvas: document.querySelector("#mainCanvas"),
    ratio: 9.0 / 16.0,
    padding: 16,
    background: 'white'
});
window.onresize = () => context.app.onResize();
window.onorientationchange = () => context.app.onResize();
goToLevel(5);
