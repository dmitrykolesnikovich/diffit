class Model {

    level;
    failurePoints = [];
    successSlots = [];

    get mistakesCount() {
        return this.failurePoints.length;
    }

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
