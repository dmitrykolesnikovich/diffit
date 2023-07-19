class Application extends PIXI.Application {

    onResize(ratio = 9.0 / 16.0, padding = 16) {
        const canvas = this.view;
        const {model, view} = context.modelView;
        const {width, height} = fitDimension(ratio, padding);

        // 3. apply
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;

        view.x = canvas.width / 2;
        view.y = canvas.height / 2;
        view.scale.set(0.77 * (canvas.width / (model.level.isLandscape ? model.level.width : 2 * model.level.width)));
    }

}

function buildApplication(canvas) {
    return new Application({
        background: 'white',
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        view: canvas,
        resizeTo: canvas,
    });
}
