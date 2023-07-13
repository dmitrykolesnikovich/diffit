class Layout extends PIXI.Container {

    mainView;
    layerA;
    layerB;
    scoreLabel;
    mistakesLabel;

    invalidate() {
        this.scoreLabel.invalidateText(`${context.score}/${context.level.size}`);
        this.mistakesLabel.invalidateText(context.mistakes);
    }

}

function buildLayout(level) {
    // 1. mainView
    const layout = new Layout();
    const {mainView, layerA, layerB, scoreLabel, mistakesLabel} = buildMainView(level);
    layout.mainView = mainView;
    layout.layerA = layerA;
    layout.layerB = layerB;
    layout.scoreLabel = scoreLabel;
    layout.mistakesLabel = mistakesLabel;

    // 2. init
    layout.addChild(mainView);
    initializeLayout(layout, level);
    return layout;
}

function buildMainView(level) {
    // 1. main
    const mainView = new PIXI.Container();
    mainView.position.y = 92

    // 2. Layer A
    const layerA = mainView.addChild(new PIXI.Container());
    layerA.position.set(0, 0);
    layerA.addChild(new PIXI.Sprite(level.layerImage));
    drawLayerSlots(layerA, level.slotsA);
    drawRoundedCorners(layerA, 16);
    {
        const x = level.isLandscape ? 0 : -4;
        const y = level.isLandscape ? -4 : 0;
        layerA.position.set(x, y);
    }

    // 3. Layer B
    const layerB = mainView.addChild(new PIXI.Container());
    layerB.addChild(new PIXI.Sprite(level.layerImage));
    drawLayerSlots(layerB, level.slotsB);
    drawRoundedCorners(layerB, 16);

    {
        const x = level.isLandscape ? 0 : level.layerSize.width + 4;
        const y = level.isLandscape ? level.layerSize.height + 4 : 0;
        layerB.position.set(x, y);
    }

    // 4. statusPanel
    const statusPanel = mainView.addChild(new PIXI.Container());
    statusPanel.pivot.set(1, 1);
    statusPanel.x = mainView.width;
    statusPanel.y = mainView.height;
    const scoreLabel = statusPanel.addChild(LabelWithDescription({paddingTop: 64, description: `Отличий найдено: `, color: 0x22ff22}));
    const mistakesLabel = statusPanel.addChild(LabelWithDescription({paddingTop: 128, description: `Ошибок: `, color: 0xff2222}));

    // 7. title
    const titleLabel = mainView.addChild(new PIXI.Text(`Уровень ${level.id}`, {
        fontFamily: 'Filmotype Major',
        fontSize: 120,
        fill: 'black',
        align: 'center',
    }));
    titleLabel.anchor.set(1)
    titleLabel.x = mainView.width / 2;
    titleLabel.y = -64;

    return {mainView, layerA, layerB, scoreLabel, mistakesLabel};
}

function drawLayerSlots(layer, slots) {
    for (let slot of slots) {
        const sprite = new PIXI.Sprite(slot.texture);
        sprite.position.set(slot.x, slot.y);
        layer.addChild(sprite);
    }
}

function initializeLayout(layout, level) {
    layout.pivot.x = layout.width / 2;
    layout.pivot.y = layout.height / 2;

    const canvas = context.app.view;
    function resizeLayout() {
        let width = level.isLandscape ? level.layerSize.width : 2 * level.layerSize.width;
        const canvasWidth = parseFloat(canvas.style.width) + 2 * parseFloat(canvas.style.padding);
        const canvasHeight = parseFloat(canvas.style.height) + 2 * parseFloat(canvas.style.padding);
        const scale = canvasWidth / width;
        layout.scale.set(scale * 0.77);
        layout.x = canvasWidth / 2;
        layout.y = canvasHeight / 2;
    }

    window.addEventListener('resize', resizeLayout);
    resizeLayout();
}
