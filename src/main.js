const context = bind({
    app: null,
    modelView: null,
});

// app
context.app = buildApplication({
    canvas: document.querySelector("#mainCanvas"),
    ratio: 9.0 / 16.0,
    padding: 16,
    background: 'white'
});
window.onresize = () => context.app.onResize();
window.onorientationchange = () => context.app.onResize();

// bootstrap
controller.emit('showLevel', 5);
