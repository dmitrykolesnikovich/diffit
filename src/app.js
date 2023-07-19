class Application extends PIXI.Application {

    onResize(ratio = 9.0 / 16.0, padding = 16) {
        const canvas = this.view;
        const {model, view} = context.modelView;

        // 1. actual ratio
        const padding2 = 2 * padding;
        const actualRatio = (window.innerWidth - padding2) / (window.innerHeight - padding2);

        // 2. actual size
        let height;
        let width;
        if (ratio <= actualRatio) {
            height = window.innerHeight - padding2;
            width = height * ratio;
        } else {
            width = window.innerWidth - padding2;
            height = width / ratio;
        }

        // 3. apply
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;

        view.x = canvas.width / 2;
        view.y = canvas.height / 2;
        const scale = canvas.width / (model.level.isLandscape ? model.level.width : 2 * model.level.width);
        view.scale.set(scale * 0.77);
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
