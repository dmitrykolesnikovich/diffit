class View extends PIXI.Container {
    layerA;
    layerB;
    scoreLabel;
    mistakesLabel;
}

function buildView(level) {
    const view = new View();

    const mainView = view.addChild(new PIXI.Container());
    const layerA = mainView.addChild(buildLayer(level, "LayerA"));
    const layerB = mainView.addChild(buildLayer(level, "LayerB"));
    const statusPanel = mainView.addChild(new PIXI.Container());
    const scoreLabel = statusPanel.addChild(NamedLabel({ description: `Отличий найдено: `,  color: 0x22ff22 }));
    const mistakesLabel = statusPanel.addChild(NamedLabel({ description: `Ошибок: `, color: 0xff2222 }));
    const titleLabel = mainView.addChild(new PIXI.Text(`Уровень ${level.id}`, { fontFamily: 'Filmotype Major', fontSize: 120, fill: 'black', align: 'center' }));
    // setupGridLayout(view, layout({mainView, layerA, layerB, statusPanel, scoreLabel, mistakesLabel, titleLabel})); // todo uncomment

    // >> todo drop
    const padding = 4;
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
    statusPanel.pivot.set(1, 1);
    statusPanel.position.set(mainView.width / 2, mainView.height + 16);
    mistakesLabel.y += 64;
    view.pivot.set(mainView.width / 2, mainView.height / 2);
    titleLabel.anchor.set(1)
    titleLabel.position.set(mainView.width / 2, -64);
    statusPanel.x = mainView.width;
    // <<

    view.layerA = layerA;
    view.layerB = layerB;
    view.scoreLabel = scoreLabel;
    view.mistakesLabel = mistakesLabel;
    return view;
}
