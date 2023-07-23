engine.on('showLevel', bindViewModel(showLevel));
engine.on('success', bindViewModel(moveSuccess));
engine.on('failure', bindViewModel(moveFailure));

async function showLevel(event) {
    context.root.style.visibility = 'hidden';
    const level = await loadLevel(event.levelId);
    engine.modelView = buildModelView(level);
    context.root.style.visibility = 'visible';
}

function moveSuccess(event) {
    console.log('success');
}

function moveFailure(event) {
    console.log('failure');
}

const drawSuccessBox = (x,y,w,h) => {
    marks.push(addSuccessMark(elements.containerA, x,y,w,h));
    marks.push(addSuccessMark(elements.containerB, x,y,w,h));
}

const drawFailBox = (x, y) => {
    marks.push(addFailMark(elements.containerA, x, y));
    marks.push(addFailMark(elements.containerB, x, y));
}

function createMark(x, y, w, h) {
    const mark = document.createElement('div');
    mark.classList.add('mark');
    mark.style.width = w + 'px';
    mark.style.height = h + 'px';
    mark.style.left = (x) + 'px';
    mark.style.top = (y) + 'px';
    return mark;
}

function addSuccessMark(root, x, y, w, h) {
    const mark = createMark(x, y, w, h);
    mark.classList.add('mark--success');
    root.appendChild(mark);
    return mark;
}

function addFailMark(root, x, y) {
    const mark = createMark(x-50, y-50, 100, 100);
    mark.classList.add('mark--fail');
    root.appendChild(mark);
    return mark;
}
