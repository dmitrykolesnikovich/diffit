class LayerView extends PIXI.Container {
    background;
    foreground;
}

function buildLayer(level, layerId) {
    const layer = new LayerView();
    layer.background = layer.addChild(LayerBackground(level, layerId));
    layer.foreground = layer.addChild(new PIXI.Container());
    return layer;
}
