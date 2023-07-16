function GreenRectangle({x = 0, y = 0, width, height}) {
    return new PIXI.Graphics().lineStyle(4, 0x22ff22, 1).drawRoundedRect(x, y, width, height, 16);
}

function HitArea(target, action) {
    const {x = 0, y = 0, width, height} = target
    const area = new PIXI.Container()
    area.interactive = true;
    area.hitArea = new PIXI.Rectangle(x, y, width, height);
    area.on('click', (event) => {
        event.stopPropagation();
        action({...event, target});
    });
    return area;
}

function LabelWithDescription({paddingTop, description, color}) {
    // 1. label
    const label = new PIXI.Text("", {
        fontFamily: 'Filmotype Major', fontSize: 44, fill: color, align: 'right'
    });
    label.anchor.set(1, 1);
    label.y = paddingTop

    // 2. description
    const descriptionLabel = label.addChild(new PIXI.Text(description, {
        fontFamily: 'Filmotype Major', fontSize: 44, fill: 'black', align: 'right'
    }));
    descriptionLabel.anchor.set(1, 1);
    descriptionLabel.position.x = -label.width;

    // 3. text
    label.removeText = () => {
        label.text = null;
        descriptionLabel.position.x = 0;
    }
    label.setupText = (text) => {
        label.text = text;
        descriptionLabel.position.x = -label.width;
    }
    return label;
}

function RedCross(point) {
    return new PIXI.Graphics().lineStyle(4, 0xff2222, 1).drawRect(point.x - 32, point.y - 32, 64, 64);
}

function RoundedCornersMask({width, height}, radius) {
    return new PIXI.Graphics().beginFill(0xff0000, 1).drawRoundedRect(0, 0, width, height, radius).endFill();
}

function Sprite(slot) {
    const sprite = new PIXI.Sprite(slot.texture);
    sprite.position.set(slot.x, slot.y);
    return sprite;
}
