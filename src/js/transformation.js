// Transformation Functions

// Enum for translation type
const Translation = {
    LEFT: ['x',-0.1],
    RIGHT: ['x',0.1],
    UP: ['y',0.1],
    DOWN: ['y',-0.1]
}

// Set the rotation degree
let rotationDegree = 10;

// Enum for rotation type
let Rotation = {
    CLOCKWISE: -Math.PI / 180 * rotationDegree,
    COUNTERCLOCKWISE: Math.PI / 180 * rotationDegree
}

// Enum for dilatation type
let Scale = {
    UP: 1.1,
    DOWN: 0.9
}

// Enum for shear type
let Shear = {
    LEFT: -0.1,
    RIGHT: 0.1
}

// Translation
function translateModel(translationType) {
    let vertices = modelChoosed.vertices;
    let start = 0;

    if (translationType[0] === 'y') {
        start = 1;
    }
    // translate the vertices to the type of translation
    for (let i = start; i < vertices.length; i += 2) {
        vertices[i] += translationType[1] 
    }

    // draw the shape
    drawShapes();
}

// Function that handle key press event for translation
function handleTranslation(event) {
    let key = event.key;
    if (key === 'ArrowLeft') {
        translateModel(Translation.LEFT);
    } 
    if (key === 'ArrowRight') {
        translateModel(Translation.RIGHT);
    }
    if (key === 'ArrowUp') {
        translateModel(Translation.UP);
    }
    if (key === 'ArrowDown') {
        translateModel(Translation.DOWN);
    }
}

// Add event listener for key press event
document.addEventListener('keydown', handleTranslation);

// Rotation
function getCenter() {
    let vertices = modelChoosed.vertices;
    let x = 0;
    let y = 0;
    for (let i = 0; i < vertices.length; i += 2) {
        x += vertices[i];
        y += vertices[i + 1];
    }
    x /= vertices.length / 2;
    y /= vertices.length / 2;
    return [x, y];
}

// Rotate the model
function rotateModel(angle) {
    let vertices = modelChoosed.vertices;
    let center = getCenter(vertices);

    for (let i = 0; i < vertices.length; i += 2) {
        let x = vertices[i];
        let y = vertices[i + 1];
        vertices[i] = center[0] + (x - center[0]) * Math.cos(angle) - (y - center[1]) * Math.sin(angle);
        vertices[i + 1] = center[1] + (x - center[0]) * Math.sin(angle) + (y - center[1]) * Math.cos(angle);
    }
    drawShapes();
}

// Dilatation
function dilatateModel(scale) {
    let vertices = modelChoosed.vertices;
    let center = getCenter(vertices);

    for (let i = 0; i < vertices.length; i += 2) {
        let x = vertices[i];
        let y = vertices[i + 1];
        vertices[i] = center[0] + (x - center[0]) * scale;
        vertices[i + 1] = center[1] + (y - center[1]) * scale;
    }
    drawShapes();
}

// Shear
function shearModel(shearAmount) {
    let vertices = modelChoosed.vertices;
    let center = getCenter(vertices);

    for (let i = 0; i < vertices.length; i += 2) {
        let x = vertices[i];
        let y = vertices[i + 1];
        if (y > center[1]) {
            vertices[i] = x + shearAmount * (y - center[1]);
        }
    }

    drawShapes();
}