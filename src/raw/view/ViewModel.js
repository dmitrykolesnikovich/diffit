registerViewModel(ViewModel);

function ViewModel(modelView) {
    resetViewModel(modelView);
    setupViewModel(modelView);
}

function resetViewModel({model, view}) {
    const {foregroundA, foregroundB, scoreLabel, mistakesLabel} = view;
    context.root.replaceChildren();
    foregroundA.replaceChildren();
    foregroundB.replaceChildren();
}

function setupViewModel({model, view}) {
    const {foregroundA, foregroundB, scoreSuccess, scoreFail} = view;
    context.root.appendChild(view);

    // success
    for (let slot of model.successSlots) {
        foregroundA.appendChild(createSuccessMark(slot));
        foregroundB.appendChild(createSuccessMark(slot));
    }

    // status
    scoreSuccess.innerHTML = `${model.score}/${model.maxScore}`;
    scoreFail.innerHTML = model.mistakesCount;
}
