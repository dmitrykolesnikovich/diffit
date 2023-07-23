function createMark(x, y, width, height) {
    const mark = document.createElement('div');
    mark.classList.add('mark');
    mark.style.left = x + 'px';
    mark.style.top = y + 'px';
    mark.style.width = width + 'px';
    mark.style.height = height + 'px';
    return mark;
}

function createSuccessMark({x, y, width, height}) {
    const mark = createMark(x, y, width, height);
    mark.classList.add('mark--success');
    return mark;
}

function createFailMark({x, y}) {
    const mark = createMark(x - 50, y - 50, 100, 100);
    mark.classList.add('mark--fail');
    return mark;
}
