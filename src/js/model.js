// Functions to create, save, and load model (shape) in JSON format.

// Define vertices for a line, square, and polygon
let dotVertices = [
    0.0, 0.0
];

let lineVertices = [
    -0.4, 0.0,
    0.4, 0.0
];

let squareVertices = [
    -0.4, -0.4,
    0.4, -0.4,
    0.4, 0.4,
    -0.4, 0.4
];

let rectangleVertices = [
    -0.4, -0.25,
    0.4, -0.25,
    0.4, 0.25,
    -0.4, 0.25
];

// pentagon
let polygonVertices = [
    0.0, 0.4,
    0.3, 0.15,
    0.2, -0.2,
    -0.2, -0.2,
    -0.3, 0.15
];

const redColor = [1.0, 0.0, 0.0, 1.0];
const greenColor = [0.0, 1.0, 0.0, 1.0];
const blueColor = [0.0, 0.0, 1.0, 1.0];
const purpleColor = [1.0, 0.0, 1.0, 1.0];
const blackColor = [0.0, 0.0, 0.0, 1.0];

const model = {
    dot: {
        name : 'dot',
        vertices: dotVertices,
        color: blackColor
    },
    line: {
        name : 'line',
        vertices: lineVertices,
        color: redColor
    },
    square: {
        name : 'square',
        vertices: squareVertices,
        color: greenColor
    },
    rectangle: {
        name : 'rectangle',
        vertices: rectangleVertices,
        color: purpleColor
    },
    polygon: {
        name : 'polygon',
        vertices: polygonVertices,
        color: blueColor
    }
};

let models = [];
let modelChoosed;

// Create a model with the given vertices and color
function createModel(model) {
    clearCanvas();
    models.push(model);
    drawShapes();
    modelChoosed = model;
    if (model.name === 'square') {
        interactModel(typeInteraction.SQUARE);
    } else if (model.name === 'rectangle') {
        interactModel(typeInteraction.RECTANGLE);
    } else if (model.name === 'line') {
        interactModel(typeInteraction.LINE);
    } else {
        interactModel(typeInteraction.FREE);
    }
}

function drawShapes() {
    for (let i = 0; i < models.length; i++) {
        let vertices = models[i].vertices;
        let color = models[i].color;
        drawShape(vertices, color);
    }
}

// save the model to file as JSON
function saveModel() {
    let data = JSON.stringify(modelChoosed);
    let name = JSON.parse(data).name;
    // open file dialog to save the model file explorer using webkit
    // let root = document.location.href.split('/').slice(0, -1).join('/');
    let a = document.createElement('a');
    a.href = 'data:application/json,' + data;
    a.download = name + '.json';
    a.click();
}

// load the model from file
function loadModel() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(event) {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = function(event) {
            let data = event.target.result;
            let model = JSON.parse(data);
            document.getElementById('model_name').value = input.value.split('\\').pop().split('/').pop()
            createModel(model);
        }
        reader.readAsText(file);
    }
    input.click();
}