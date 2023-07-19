const events = new Events();

const context = {
    app: null,
    modelView: null,
}

// bindings
bind(context);
moveFailure = bind(moveFailure)
moveSuccess = bind(moveSuccess)

// actions
events.on('showLevel', showLevel)
events.on('success', moveSuccess)
events.on('failure', moveFailure)
events.on('checkNextLevel', checkNextLevel)

// app
context.app = buildApplication({
    canvas: document.querySelector("#mainCanvas"),
    ratio: 9.0 / 16.0,
    padding: 16,
    background: 'white'
});
window.onresize = () => context.app.onResize();
window.onorientationchange = () => context.app.onResize();
events.emit('showLevel', 5);
