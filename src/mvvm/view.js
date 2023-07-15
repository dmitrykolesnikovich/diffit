class View extends PIXI.Container {
    layerA;
    layerB;
    scoreLabel;
    mistakesLabel;
    successA;
    successB;
    reset() {
        this.scoreLabel.invalidateText()
        this.mistakesLabel.invalidateText()
        this.successA.removeChildren();
        this.successB.removeChildren();
    }
}

function buildView(level) {
    const view = new View();
    const {layerA, layerB, scoreLabel, mistakesLabel, successA, successB} = layout(view, level);
    view.layerA = layerA;
    view.layerB = layerB;
    view.scoreLabel = scoreLabel;
    view.mistakesLabel = mistakesLabel;
    view.successA = successA;
    view.successB = successB;
    return view;
}

function layout(view, level) {
    const padding = 4;

    // 1. main
    const mainView = view.addChild(new PIXI.Container());
    mainView.position.y = 92

    // 2. Layer A
    const layerA = mainView.addChild(new PIXI.Container());
    layerA.position.set(0, 0);
    layerA.addChild(new PIXI.Sprite(level.standardSlot.texture));
    for (let slot of level.slots.filter(it => it.layer === "LayerA")) layerA.addChild(Sprite(slot));
    layerA.mask = layerA.addChild(RoundedCornersMask(layerA, 16));
    const successA = layerA.addChild(new PIXI.Container());
    {
        const x = level.isLandscape ? 0 : -padding;
        const y = level.isLandscape ? -padding : 0;
        layerA.position.set(x, y);
    }

    // 3. Layer B
    const layerB = mainView.addChild(new PIXI.Container());
    layerB.addChild(new PIXI.Sprite(level.standardSlot.texture));
    for (let slot of level.slots.filter(it => it.layer === "LayerB")) layerB.addChild(Sprite(slot));
    layerB.mask = layerB.addChild(RoundedCornersMask(layerB, 16));
    const successB = layerB.addChild(new PIXI.Container());
    {
        const x = level.isLandscape ? 0 : level.standardSlot.width + padding;
        const y = level.isLandscape ? level.standardSlot.height + padding : 0;
        layerB.position.set(x, y);
    }

    // 4. statusPanel
    const statusPanel = mainView.addChild(new PIXI.Container());
    statusPanel.pivot.set(1, 1);
    statusPanel.x = mainView.width;
    statusPanel.y = mainView.height;
    const scoreLabel = statusPanel.addChild(LabelWithDescription({
        paddingTop: 64,
        description: `Отличий найдено: `,
        color: 0x22ff22
    }));
    const mistakesLabel = statusPanel.addChild(LabelWithDescription({
        paddingTop: 128,
        description: `Ошибок: `,
        color: 0xff2222
    }));

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

    view.pivot.x = view.width / 2;
    view.pivot.y = view.height / 2;
    setupViewResizeListener(view, level);
    return {mainView, layerA, layerB, scoreLabel, mistakesLabel, successA, successB};
}
