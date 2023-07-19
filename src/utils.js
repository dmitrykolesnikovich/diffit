function fitDimension(ratio, padding = 0) {
    let {innerWidth: w, innerHeight: h} = window;
    w -= 2 * padding;
    h -= 2 * padding;
    if (w > h * ratio) {
        w = h * ratio;
    } else {
        h = w / ratio;
    }
    return {width: w, height: h};
}
