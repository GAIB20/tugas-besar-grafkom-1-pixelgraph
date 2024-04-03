// Funtions to interact with the model using mouse

const sqrt_2 = Math.sqrt(2);
const typeInteraction = {
    FREE: 'free',
    LINE: 'line',
    SQUARE: 'square',
    RECTANGLE: 'rectangle',
}

// Function to convert mouse position to WebGL coordinates
function mousePosition(event) {
    // Get mouse position
    let x = event.clientX;
    let y = event.clientY;

    // Get canvas position
    let rect = event.target.getBoundingClientRect(); // getBoundingClientRect() method returns the size of an element and its position relative to the viewport.

    // Convert mouse position to WebGL coordinates
    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2); 
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

    return [x, y];
}

// Handle mouse interactions to move vertices of a model
function interactModel(vertices, color, type=typeInteraction.FREE) {
    let isDragging = false;
    let selectedVertex = -1;
    let offsetX = 0.0;
    let offsetY = 0.0;

    // Mouse when clicked on canvas
    function onMouseDown(event) {
        // Get mouse position
        let [x,y] = mousePosition(event);

        // Check if the mouse is on a vertex
        for (let i = 0; i < vertices.length / 2; i++) {
            // Calculate distance between vertex and mouse
            let dx = vertices[i * 2] - x;
            let dy = vertices[i * 2 + 1] - y;

            // If the distance is less than 0.01, start dragging
            if (dx * dx + dy * dy < 0.01) {
                isDragging = true;
                selectedVertex = i;
                // Calculate offset from mouse to vertex
                offsetX = x - vertices[i * 2];
                offsetY = y - vertices[i * 2 + 1];
                break;
            }
        }
    };

    // Mouse when moved on canvas
    function onMouseMove(event) {
        let interactionFree = document.getElementById('interaction-freely').checked;
        if (isDragging) {
            // Get mouse position
            let [x,y] = mousePosition(event);
            let dist_x = x - offsetX;
            let dist_y = y - offsetY;

            if (interactionFree || type === typeInteraction.FREE) {
                interactFreely(vertices, selectedVertex, dist_x, dist_y);
            } else {
                if (type === typeInteraction.SQUARE) {
                    interactSqure(vertices, dist_x, dist_y);
                } else if (type === typeInteraction.RECTANGLE) {
                    interactRectangle(vertices, dist_x, dist_y);
                } else {
                    interactLine(vertices, selectedVertex, dist_x, dist_y);
                }
            }

            // Draw the shape with updated vertices
            drawShape(vertices, color);
        }
    };

    // Mouse when released on canvas
    function onMouseUp() {
        isDragging = false;
        selectedVertex = -1;
    };

    // Add event listeners for mouse events on canvas
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    drawShape(vertices, color);
}

function interactFreely(vertices, selectedVertex, dist_x, dist_y){
    // Move the selected vertex
    vertices[selectedVertex * 2] = dist_x;
    vertices[selectedVertex * 2 + 1] = dist_y;
}

function interactLine(vertices, selectedVertex, dist_x, dist_y){
    // Move the selected vertex
    vertices[selectedVertex * 2] = dist_x;
}

function interactSqure(vertices, x, y) {
    // when one of the vertices is interacted (with mouse), the square length changes
    // change the length of the square by dragging the vertices

    // note the origin of the square is at the center of the square
    let origin_x = (vertices[0] + vertices[2] + vertices[4] + vertices[6]) / 4;
    let origin_y = (vertices[1] + vertices[3] + vertices[5] + vertices[7]) / 4;

    let dist_x = Math.abs((x) - origin_x);
    let dist_y = Math.abs((y) - origin_y);

    // euclidean distance
    let dist = Math.sqrt(dist_x * dist_x + dist_y * dist_y)/sqrt_2;
    vertices[0] = -dist
    vertices[1] = -dist
    vertices[2] = dist
    vertices[3] = -dist
    vertices[4] = dist
    vertices[5] = dist
    vertices[6] = -dist
    vertices[7] = dist
}


function interactRectangle(vertices, dist_x, dist_y){
    // when one of the vertices is interacted (with mouse), the rectangle length changes
    // the length changes is horizontally or vertically
    // Move the selected vertex and move the other vertices accordingly

    // rectangle 
    vertices[0] = -dist_x
    vertices[1] = -dist_y
    vertices[2] = dist_x
    vertices[3] = -dist_y
    vertices[4] = dist_x
    vertices[5] = dist_y
    vertices[6] = -dist_x
    vertices[7] = dist_y
}