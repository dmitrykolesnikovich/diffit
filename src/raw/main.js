const context = bindViewModel({
    root: null,
});

window.onload = function () {
    const PADDING = 16;
    const RATIO = 9.0 / 16.0;

    const div = document.createElement('div');
    div.classList.add('root');
    document.querySelector("#app").appendChild(div);
    context.root = div;
    window.onresize = () => resizeApplication(RATIO, PADDING);
    engine.emit('showLevel', {levelId: 5});
}

function resizeApplication(ratio, padding) {
    function fitDimension(ratio, padding = 0) {
        let {innerWidth: w, innerHeight: h} = window;
        w -= 2 * padding;
        h -= 2 * padding;
        if (w > h * ratio) {
            w = h * ratio;
        } else {
            h = w / ratio;
        }
        return {width: w, height: h};
    }
    const {width, height} = fitDimension(ratio, padding);


    context.root.style.width = width;
    context.root.style.height = height;

    const {model, view} = engine.modelView;
    const scale = 0.88 * (context.root.clientWidth / (model.level.isLandscape ? model.level.width : 2 * model.level.width));
    view.style.scale = scale;
}

