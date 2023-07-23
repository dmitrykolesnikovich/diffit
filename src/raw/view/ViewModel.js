registerViewModel(ViewModel);

function ViewModel(modelView) {
    resetViewModel(modelView);
    setupViewModel(modelView);
}

function resetViewModel({model, view}) {
    context.root.replaceChildren();
}

function setupViewModel({model, view}) {
    context.root.appendChild(view);
}
