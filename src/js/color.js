function changeColor(colorValue) {
    modelChoosed.color = hexToRGB(colorValue);
    let vertices = modelChoosed.vertices;
    let color = modelChoosed.color

    drawShape(vertices, color)
}

function hexToRGB(hex) {
    hex = hex.replace(/^#/, '');
    let bigint = parseInt(hex, 16);

    let r = ((bigint >> 16) & 255) / 255;
    let g = ((bigint >> 8) & 255) / 255;
    let b = (bigint & 255) / 255;

    return [r, g , b , 1];
}
