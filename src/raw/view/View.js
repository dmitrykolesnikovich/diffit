function buildView(level) {

    const h1 = document.createElement('h1');
    const imgA = document.createElement('img');
    const imgB = document.createElement('img');
    const contentContainer = document.createElement('div');
    const imagesContainer = document.createElement('div');
    const containerA = document.createElement('div');
    const containerB = document.createElement('div');
    const scoreContainer = document.createElement('div');
    const scoreSuccessDiv = document.createElement('div');
    const scoreFailDiv = document.createElement('div');
    const scoreSuccess = document.createElement('span');
    const scoreFail = document.createElement('span');

    h1.classList.add('title');
    imgA.classList.add('layerImage');
    imgB.classList.add('layerImage');
    contentContainer.classList.add('content-container');
    imagesContainer.classList.add('images-container');
    containerA.classList.add('container');
    containerB.classList.add('container');
    scoreContainer.classList.add('score-container');
    scoreSuccess.classList.add('score-success');
    scoreFail.classList.add('score-fail');

    containerA.appendChild(imgA);
    containerB.appendChild(imgB);
    contentContainer.appendChild(h1);
    imagesContainer.appendChild(containerA);
    imagesContainer.appendChild(containerB);
    contentContainer.appendChild(imagesContainer);

    scoreSuccessDiv.innerHTML = '<span>Отличий найдено: </span>';
    scoreFailDiv.innerHTML = '<span>Ошибок: </span>';

    scoreSuccessDiv.appendChild(scoreSuccess);
    scoreFailDiv.appendChild(scoreFail);
    scoreContainer.appendChild(scoreSuccessDiv);
    scoreContainer.appendChild(scoreFailDiv);
    contentContainer.appendChild(scoreContainer);

    imgA.src = `res/levels/${level.id}/images/layer_0.jpg`;
    imgB.src = `res/levels/${level.id}/images/layer_0.jpg`;
    for (let slot of level.slots) {
        const img = document.createElement('img');
        img.classList.add('slot');
        img.src = `res/levels/${level.id}/images/${slot.name}.jpg`;
        img.style.left = slot.x + 'px';
        img.style.top = slot.y + 'px';
        if (slot.layer === 'LayerA') {
            containerA.appendChild(img);
        } else if (slot.layer === 'LayerB') {
            containerB.appendChild(img);
        }
    }


    containerA.style.width = level.width + 'px';
    containerA.style.height = level.height + 'px';

    containerB.style.width = level.width + 'px';
    containerB.style.height = level.height + 'px';

    imagesContainer.style.width = ((level.width < level.height ? 2*level.width : level.width) + 16) + 'px';
    imagesContainer.classList.remove('images-container--v');
    if (level.width < level.height) elements.imagesContainer.classList.add('images-container--v');

    contentContainer.containerA = containerA;
    contentContainer.containerB = containerB;

    return contentContainer;
}
