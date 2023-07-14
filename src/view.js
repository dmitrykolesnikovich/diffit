class View extends PIXI.Container {
    mainView;
    layerA;
    layerB;
    scoreLabel;
    mistakesLabel;
}

function buildView(level) {
    const view = new View();

    // 1. mainView
    const {mainView, layerA, layerB, scoreLabel, mistakesLabel} = buildMainView(level);
    view.addChild(mainView);

    // 2. init
    view.mainView = mainView;
    view.layerA = layerA;
    view.layerB = layerB;
    view.scoreLabel = scoreLabel;
    view.mistakesLabel = mistakesLabel;
    initializeView(view, level);

    return view;
}

function buildMainView(level) {
    const padding = 4;

    // 1. main
    const mainView = new PIXI.Container();
    mainView.position.y = 92

    // 2. Layer A
    const layerA = mainView.addChild(new PIXI.Container());
    layerA.position.set(0, 0);
    layerA.addChild(new PIXI.Sprite(level.layerImage));
    for (let slot of level.slotsA) layerA.addChild(Sprite(slot));
    addRoundedCornersMask(layerA, 16);
    {
        const x = level.isLandscape ? 0 : -padding;
        const y = level.isLandscape ? -padding : 0;
        layerA.position.set(x, y);
    }

    // 3. Layer B
    const layerB = mainView.addChild(new PIXI.Container());
    layerB.addChild(new PIXI.Sprite(level.layerImage));
    for (let slot of level.slotsB) layerB.addChild(Sprite(slot));
    addRoundedCornersMask(layerB, 16);

    {
        const x = level.isLandscape ? 0 : level.layerSize.width + padding;
        const y = level.isLandscape ? level.layerSize.height + padding : 0;
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

    return {mainView, layerA, layerB, scoreLabel, mistakesLabel};
}

function initializeView(view, level) {
    view.pivot.x = view.width / 2;
    view.pivot.y = view.height / 2;

    const canvas = context.app.view;
    function resizeView() {
        let width = level.isLandscape ? level.layerSize.width : 2 * level.layerSize.width;
        const canvasWidth = parseFloat(canvas.style.width) + 2 * parseFloat(canvas.style.padding);
        const canvasHeight = parseFloat(canvas.style.height) + 2 * parseFloat(canvas.style.padding);
        const scale = canvasWidth / width;
        view.scale.set(scale * 0.77);
        view.x = canvasWidth / 2;
        view.y = canvasHeight / 2;
    }

    window.addEventListener('resize', resizeView);
    resizeView();
}
