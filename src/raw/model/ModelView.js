function initializeModelView({model, view}) {
    const {level} = model;
    const {containerA, containerB} = view;

    containerA.appendChild(DomAction(level, 'failure'));
    containerB.appendChild(DomAction(level, 'failure'));
    for (let slot of level.slots) {
        containerA.appendChild(new DomAction(slot, 'success'));
        containerB.appendChild(new DomAction(slot, 'success'));
    }
}
