class Model {

    level;
    mistakesCount = 0;
    successSlots = [];

    get score() {
        return this.successSlots.length;
    }

    get totalSlotCount() {
        return this.level.slots.length;
    }

    isLevelCompleted() {
        return this.score >= this.totalSlotCount;
    }

}

function buildModel(level) {
    const model = new Model();
    model.level = level;
    return model;
}
