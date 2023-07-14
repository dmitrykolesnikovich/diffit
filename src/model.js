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

    isLevelCompleted() {
        return this.score >= this.level.size;
    }

}

function buildModel(level) {
    const model = new Model();
    model.level = level;
    return model;
}
