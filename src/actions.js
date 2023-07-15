async function firstLevel() {
    modelView = await buildModelView(1);
}

function moveFailure(event) {
    modelView.model.failurePoints.push(event);
}

function moveSuccess(event) {
    modelView.model.successSlots.push(event.target);
}

/*bind actions*/

firstLevel = bindViewModel(firstLevel)
moveFailure = bindViewModel(moveFailure)
moveSuccess = bindViewModel(moveSuccess)
