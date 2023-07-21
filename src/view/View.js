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
    setupGridLayout(view, ViewLayout);
    return view;
}

function initializeView(view, level) {
    const mainView = view.addChild(new PIXI.Container());
    const layerA = buildLayer(level, "LayerA");
    const layerB = buildLayer(level, "LayerB");
    const statusPanel = new PIXI.Container();
    const scoreLabel = statusPanel.addChild(LabelWithDescription({ paddingTop: 64, description: `Отличий найдено: `, color: 0x22ff22 }));
    const mistakesLabel = statusPanel.addChild(LabelWithDescription({ paddingTop: 128, description: `Ошибок: `, color: 0xff2222 }));
    const titleLabel = new PIXI.Text(`Уровень ${level.id}`, { fontFamily: 'Filmotype Major', fontSize: 120, fill: 'black', align: 'center' });

    // >> todo replace with Grid
    const padding = 4;
    mainView.addChild(layerA);
    mainView.addChild(layerB);
    mainView.position.y = 92
    {
        const x = level.isLandscape ? 0 : -padding;
        const y = level.isLandscape ? -padding : 0;
        layerA.position.set(x, y);
    }
    {
        const x = level.isLandscape ? 0 : level.width + padding;
        const y = level.isLandscape ? level.height + padding : 0;
        layerB.position.set(x, y);
    }
    mainView.addChild(statusPanel);
    statusPanel.pivot.set(1, 1);
    statusPanel.x = mainView.width;
    statusPanel.y = mainView.height;
    mainView.addChild(titleLabel);
    titleLabel.anchor.set(1)
    titleLabel.x = mainView.width / 2;
    titleLabel.y = -64;
    view.pivot.x = mainView.width / 2;
    view.pivot.y = mainView.height / 2;
    // <<

    return {layerA, layerB, scoreLabel, mistakesLabel};
}
