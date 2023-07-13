function buildLayout(level) {
    // 1. mainView and layers
    const {mainView, layerA, layerB} = buildMainViewAndLayers(level);
    drawLayerSlots(layerA, level.slotsA);
    drawLayerSlots(layerB, level.slotsB);
    drawRoundedCorners(layerA, 16);
    drawRoundedCorners(layerB, 16);

    // 2. layout
    const layout = new PIXI.Container();
    layout.addChild(mainView);
    initializeLayout(layout, level);
    return layout;
}

function buildMainViewAndLayers(level) {
    // 1. main
    const mainView = new PIXI.Container();
    mainView.position.y = 92

    // 2. Layer A
    const layerA = mainView.addChild(new PIXI.Container());
    layerA.position.set(0, 0);
    layerA.addChild(new PIXI.Sprite(level.layerImage));
    {
        const x = level.isLandscape ? 0 : -4;
        const y = level.isLandscape ? -4 : 0;
        layerA.position.set(x, y);
    }

    // 3. Layer B
    const layerB = mainView.addChild(new PIXI.Container());
    layerB.addChild(new PIXI.Sprite(level.layerImage));
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
    context.scoreLabel = statusPanel.addChild(LabelWithDescription({paddingTop: 64, description: `Отличий найдено: `, color: 0x22ff22}));
    context.mistakesLabel = statusPanel.addChild(LabelWithDescription({paddingTop: 128, description: `Ошибок: `, color: 0xff2222}));

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

    return {mainView, layerA, layerB};
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
    const canvas = document.querySelector("#mainCanvas");

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
    return layout;
}
