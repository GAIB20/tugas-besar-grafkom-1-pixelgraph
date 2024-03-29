// Functions to create, save, and load model (shape) in JSON format.

let modelChoosed;

// Create a model with the given vertices and color
function createModel(model) {
    clearCanvas();
    let vertices = model.vertices;
    let color = model.color;
    modelChoosed = model;
    interactModel(vertices, color);
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

// Define vertices for a line, square, and polygon
let lineVertices = [
    -0.5, 0.0,
    0.5, 0.0
];

let squareVertices = [
    -0.5, -0.5,
    0.5, -0.5,
    0.5, 0.5,
    -0.5, 0.5
];

let rectangleVertices = [
    -0.8, -0.5,
    0.8, -0.5,
    0.8, 0.5,
    -0.8, 0.5
];

let polygonVertices = [
    0.0, 0.5,
    -0.5, 0.2,
    -0.3, -0.5,
    0.3, -0.5,
    0.5, 0.2
];


const redColor = [1.0, 0.0, 0.0, 1.0];
const greenColor = [0.0, 1.0, 0.0, 1.0];
const blueColor = [0.0, 0.0, 1.0, 1.0];
const purpleColor = [1.0, 0.0, 1.0, 1.0];

const model = {
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