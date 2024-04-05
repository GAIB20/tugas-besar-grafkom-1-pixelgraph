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
let currIdx = 0;
let selectedIdx = 0;
let modelChoosed;
let lineCount = 0;
let squareCount = 0;
let rectangleCount = 0;
let polygonCount = 0;

// Create a model with the given vertices and color
function createModel(model) {
    refreshListener();
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

    addModel(model)
}

function addModel(model) {
    var modelList = document.getElementById('model-list');
    var newModel = document.createElement('input');
    var name;

    if (model.name === "line") {
        lineCount++;
        name = model.name + lineCount;
    }
    else if (model.name === "square") {
        squareCount++;
        name = model.name + squareCount;
    }
    else if (model.name === 'rectangle') {
        rectangleCount++;
        name = model.name + rectangleCount;
    } 
    else {
        polygonCount++;
        name = model.name + polygonCount;
    }

    newModel.type = "radio";
    newModel.name = "model";
    newModel.id = currIdx;
    newModel.value = currIdx;
    newModel.className = "mr-3";
    newModel.checked = true;
    newModel.onclick = function() {
        selectedIdx = newModel.value;
        console.log(selectedIdx);
    };

    var modelLabel = document.createElement('label');
    modelLabel.setAttribute("for", newModel.value);
    modelLabel.textContent = name;
    modelLabel.className = "font-semibold";

    modelList.appendChild(newModel);
    modelList.appendChild(modelLabel);
    modelList.appendChild(document.createElement('br'));
    selectedIdx = currIdx;
    currIdx++;
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