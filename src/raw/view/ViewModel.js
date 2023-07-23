registerViewModel(ViewModel);

function ViewModel(modelView) {
    resetViewModel(modelView);
    setupViewModel(modelView);
}

function resetViewModel({model, view}) {
    const {containerA, containerB, scoreLabel, mistakesLabel} = view;
    context.root.replaceChildren();
}

function setupViewModel({model, view}) {
    const {containerA, containerB, scoreLabel, mistakesLabel} = view;
    context.root.appendChild(view);

    // success
    for (let slot of model.successSlots) {
        containerA.appendChild(createSuccessMark(slot));
        containerB.appendChild(createSuccessMark(slot));
    }
}
