class Model {

    level;
    mistakesCount = 0;
    successSlots = [];
    total = 0;

    get score() {
        return this.successSlots.length;
    }

    isLevelCompleted() {
        return this.score >= this.total;
    }

}

function buildModel(level) {
    const model = new Model();
    model.level = level;
    model.total = level.slots.length;
    return model;
}
