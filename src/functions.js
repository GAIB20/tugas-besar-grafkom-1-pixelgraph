// Functions to draw shape (model) and handle mouse interactions.

// Initialize canvas and WebGL context
let canvas;
let gl;
window.onload = function() {
    canvas = document.querySelector('#c');
    gl = canvas.getContext('webgl');
    if (!gl) {
        alert('Your browser does not support WebGL');
        return;
    }
}

// Primitive function to draw a shape with dots at vertices

// createShader function : create a shader and compile it
function createShader(gl, type, source) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
}

// createProgram function : create a program and attach shaders to it
function createProgram(gl, vertexShader, fragmentShader) {
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    return program;
}

// setupAttributes function : setup attributes for the program
function setupAttributes(gl, program) {
    let positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
}

// setupUniforms function : setup uniforms for the program
function setupUniforms(gl, program, color) {
    let colorUniformLocation = gl.getUniformLocation(program, 'u_color');
    gl.uniform4fv(colorUniformLocation, color);
}

// drawLineLoop function : draw a line loop to connect all vertices
function drawLineLoop(gl, vertices) {
    gl.drawArrays(gl.LINE_LOOP, 0, vertices.length / 2);
}

// drawPoints function : draw point at each vertex
function drawPoints(gl, vertices) {
    for (let i = 0; i < vertices.length / 2; i++) {
        gl.drawArrays(gl.POINTS, i, 1);
    }
}

// drawShape function : draw a shape with vertices and color
function drawShape(vertices, color) {
    // Create buffer and bind it
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Create shaders
    let vertexShaderSource = `
        attribute vec2 a_position;
        void main() {
            gl_Position = vec4(a_position, 0.0, 1.0);
            gl_PointSize = 5.0;
        }
    `;
    let fragmentShaderSource = `
        precision mediump float;
        uniform vec4 u_color;
        uniform vec4 u_pointColor;
        void main() {
            gl_FragColor = u_color;
        }
    `;

    // Create program and setup attributes
    let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    let program = createProgram(gl, vertexShader, fragmentShader);
    setupAttributes(gl, program);
    setupUniforms(gl, program, color);
    drawLineLoop(gl, vertices);
    drawPoints(gl, vertices);
}

function clearCanvas() {
    // Clear canvas
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

// Real function to draw a shape and handle mouse interactions
function interactModel(vertices, color) {
    let isDragging = false;
    let selectedVertex = -1;
    let offsetX = 0.0;
    let offsetY = 0.0;

    canvas.addEventListener('mousedown', function(event) {
        let x = event.clientX;
        let y = event.clientY;
        let rect = event.target.getBoundingClientRect();
        x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
        y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

        for (let i = 0; i < vertices.length / 2; i++) {
            let dx = vertices[i * 2] - x;
            let dy = vertices[i * 2 + 1] - y;
            if (dx * dx + dy * dy < 0.01) {
                isDragging = true;
                selectedVertex = i;
                offsetX = x - vertices[i * 2];
                offsetY = y - vertices[i * 2 + 1];
                break;
            }
        }
    });

    canvas.addEventListener('mousemove', function(event) {
        if (isDragging) {
            let x = event.clientX;
            let y = event.clientY;
            let rect = event.target.getBoundingClientRect();
            x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
            y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);
            vertices[selectedVertex * 2] = x - offsetX;
            vertices[selectedVertex * 2 + 1] = y - offsetY;
            drawShape(vertices, color);
        }
    });

    canvas.addEventListener('mouseup', function(event) {
        isDragging = false;
        selectedVertex = -1;
    });

    drawShape(vertices, color);
}
