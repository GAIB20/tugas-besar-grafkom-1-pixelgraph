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

// Constants for colors
const redColor = [1.0, 0.0, 0.0, 1.0];
const greenColor = [0.0, 1.0, 0.0, 1.0];
const blueColor = [0.0, 0.0, 1.0, 1.0];
const purpleColor = [1.0, 0.0, 1.0, 1.0];
const blackColor = [0.0, 0.0, 0.0, 1.0];

// Constants for model names
const modelName = {
    DOT: 'dot',
    LINE: 'line',
    SQUARE: 'square',
    RECTANGLE: 'rectangle',
    POLYGON: 'polygon'
};

// Constants for model types
const model = {
    dot: {
        name : modelName.DOT,
        vertices: dotVertices,
        color: blackColor
    },
    line: {
        name : modelName.LINE,
        vertices: lineVertices,
        color: redColor
    },
    square: {
        name : modelName.SQUARE,
        vertices: squareVertices,
        color: greenColor
    },
    rectangle: {
        name : modelName.RECTANGLE,
        vertices: rectangleVertices,
        color: purpleColor
    },
    polygon: {
        name : modelName.POLYGON,
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
    // create new model and add it to the models array
    let newModel = {
        name: model.name,
        vertices: [...model.vertices], 
        color: [...model.color]
    };

    refreshListener();
    models.push(newModel);
    modelChoosed = newModel;
    selectModel(newModel);

    addModel(model);
}

// Function to create models from the given models
function createModels(models) {
    for (let i = 0; i < models.length; i++) {
        createModel(models[i]);
    }
}

// Select a model
function selectModel(model){
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

// Function to add a model to the model list
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
        // change selected model and modelChoosed
        modelChoosed = models[selectedIdx];
        selectModel(modelChoosed);
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

// Function to clear the model list
function clearModelList() {
    var modelList = document.getElementById('model-list');
    while (modelList.firstChild) {
        modelList.removeChild(modelList.firstChild);
    }
    lineCount = 0;
    squareCount = 0;
    rectangleCount = 0;
    polygonCount = 0;
}

// Function to save the model to a file
function saveModel() {
    let data = JSON.stringify(models);
    let name = "PixelGraph";

    // Open file dialog to save the model file explorer using webkit
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
            let dataModels = JSON.parse(data);
            document.getElementById('models_name').value = input.value.split('\\').pop().split('/').pop()
            // clearCanvas();
            createModels(dataModels);
        }
        reader.readAsText(file);
    }
    input.click();
}