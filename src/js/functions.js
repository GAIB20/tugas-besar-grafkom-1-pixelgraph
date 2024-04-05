// Initialize variables for canvas, WebGL context, and container
let canvas;
let gl;
let container;

// Function called when the window is loaded
window.onload = function() {
    // Get canvas element
    canvas = document.querySelector('#c');
    // Get WebGL context
    gl = canvas.getContext('webgl');
    // Get container element
    container = document.querySelector('#canvas-container');
    // Append canvas to the container
    container.appendChild(canvas);
    // Check if WebGL is supported
    if (!gl) {
        alert('Your browser does not support WebGL');
        return;
    }
}

// Function to create a container div
function createContainer() {
    container = document.createElement('div');
    container.id = 'canvas-container';
    container.className = 'ml-80 p-5' // Custom classes for styling
    document.body.appendChild(container);
    container.appendChild(canvas);
}

// Function to create a shader and compile it
function createShader(gl, type, source) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
}

// Function to create a program and attach shaders to it
function createProgram(gl, vertexShader, fragmentShader) {
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    return program;
}

// Function to setup attributes for the program
function setupAttributes(gl, program) {
    let positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
}

// Function to setup uniforms for the program
function setupUniforms(gl, program, color) {
    let colorUniformLocation = gl.getUniformLocation(program, 'u_color');
    gl.uniform4fv(colorUniformLocation, color);
}

// Function to draw a line loop to connect all vertices
function drawLineLoop(gl, vertices) {
    gl.drawArrays(gl.LINE_LOOP, 0, vertices.length / 2);
}

// Function to draw point at each vertex
function drawPoints(gl, vertices) {
    for (let i = 0; i < vertices.length / 2; i++) {
        gl.drawArrays(gl.POINTS, i, 1);
    }
}

// Function to draw a shape with vertices and color
function drawShape(vertices, color) {
    // Create buffer and bind it
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Vertex and fragment shader sources
    let vertexShaderSource = `
        attribute vec2 a_position;
        void main() {
            gl_Position = vec4(a_position, 0.0, 1.0);
            gl_PointSize = 6.0; // Set point size
        }
    `;
    let fragmentShaderSource = `
        precision mediump float;
        uniform vec4 u_color;
        void main() {
            gl_FragColor = u_color; // Set fragment color
        }
    `;

    // Create program and setup attributes and uniforms
    let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    let program = createProgram(gl, vertexShader, fragmentShader);
    setupAttributes(gl, program);
    setupUniforms(gl, program, color);
    // Draw line loop and points
    drawLineLoop(gl, vertices);
    drawPoints(gl, vertices);

    // Fill the shape with color
    gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length / 2);
}

// Function to draw all shapes in the models list
function drawShapes() {
    for (let i = 0; i < models.length; i++) {
        let vertices = models[i].vertices;
        let color = models[i].color;
        drawShape(vertices, color);
    }
}

// Function to clear canvas
function clearCanvas() {
    gl.clearColor(1.0, 1.0, 1.0, 1.0); // Set clear color to white
    gl.clear(gl.COLOR_BUFFER_BIT); // Clear color buffer

    // Clear models
    models = [];
    clearModelList();
    // Set value for a specific element
    document.getElementById('models_name').value = 'no file loaded';
}

// Function to recreate container for listener
function refreshListener() {
    container.remove(); // Remove container
    createContainer(); // Recreate container
}