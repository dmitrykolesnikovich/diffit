function LayerBackground(level, layerId) {
    let background = new PIXI.Container();
    background.addChild(Sprite(level.standardSlot));
    for (let slot of level.slots.filter(it => it.layer === layerId)) {
        background.addChild(Sprite(slot));
    }
    background.cacheAsBitmap = true;
    background = new PIXI.Sprite(context.app.renderer.generateTexture(background));
    background.mask = background.addChild(RoundedCornersMask(background, 16));
    return background;
}
