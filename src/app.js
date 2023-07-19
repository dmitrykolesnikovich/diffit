function buildApplication({canvas, ratio, padding, background}) {
    const app = new PIXI.Application({
        background,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        view: canvas,
        resizeTo: canvas,
        sharedTicker: true,
    });
    app.onResize = function ({model, view} = context.modelView) {
        const canvas = this.view;
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
    return app;
}
