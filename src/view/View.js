class View extends PIXI.Container {
    layerA;
    layerB;
    scoreLabel;
    mistakesLabel;
}

function buildView(level) {
    const view = new View();
    const {layerA, layerB, scoreLabel, mistakesLabel} = initializeView(view, level);
    view.layerA = layerA;
    view.layerB = layerB;
    view.scoreLabel = scoreLabel;
    view.mistakesLabel = mistakesLabel;
    return view;
}

function initializeView(view, level) {
    const padding = 4;

    // 1. main
    const mainView = view.addChild(new PIXI.Container());
    mainView.position.y = 92

    // 2. LayerView A, LayerView B
    const layerA = mainView.addChild(buildLayer(level, "LayerA"));
    const layerB = mainView.addChild(buildLayer(level, "LayerB"));

    {
        const x = level.isLandscape ? 0 : -padding;
        const y = level.isLandscape ? -padding : 0;
        layerA.position.set(x, y);
    }
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

    view.pivot.x = mainView.width / 2;
    view.pivot.y = mainView.height / 2;
    return {layerA, layerB, scoreLabel, mistakesLabel};
}
