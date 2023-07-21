class Model {

    level;
    mistakesCount = 0;
    successSlots = [];
    maxScore = 0;

    get score() {
        return this.successSlots.length;
    }

    hasMaxScore() {
        return this.score >= this.maxScore;
    }

}

function buildModel(level) {
    const model = new Model();
    model.level = level;
    model.maxScore = level.slots.length;
    return model;
}
