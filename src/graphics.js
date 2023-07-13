function addRoundedCornersMask(container, radius) {
    const mask = new PIXI.Graphics().beginFill(0xff0000, 1).drawRoundedRect(0, 0, container.width, container.height, radius).endFill();
    container.mask = container.addChild(mask);
}

function HitArea({x = 0, y = 0, width, height}) {
    const area = new PIXI.Container()
    area.interactive = true;
    area.hitArea = new PIXI.Rectangle(x, y, width, height);
    return area;
}

function GreenRectangle({x = 0, y = 0, width, height}) {
    return new PIXI.Graphics().lineStyle(4, 0x22ff22, 1).drawRoundedRect(x, y, width, height, 16);
}

function RedRectangle({x = 0, y = 0, width, height}) {
    return new PIXI.Graphics().lineStyle(4, 0xff2222, 1).drawRect(x, y, width, height);
}

function LabelWithDescription({paddingTop, description, color}) {
    // 1. label
    const label = new PIXI.Text("", {
        fontFamily: 'Filmotype Major',
        fontSize: 44,
        fill: color,
        align: 'right'
    });
    label.anchor.set(1, 1);
    label.y = paddingTop

    // 2. description
    const descriptionLabel = label.addChild(new PIXI.Text(description, {
        fontFamily: 'Filmotype Major',
        fontSize: 44,
        fill: 'black',
        align: 'right'
    }));
    descriptionLabel.anchor.set(1, 1);
    descriptionLabel.position.x = -label.width;

    // 3. invalidateText
    label.invalidateText = (text) => {
        label.text = text;
        descriptionLabel.position.x = -label.width;
    }
    return label;
}
