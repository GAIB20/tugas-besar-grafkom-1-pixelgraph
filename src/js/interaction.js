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
function interactModel(type=typeInteraction.FREE) {
    let vertices = modelChoosed.vertices;
    let color = modelChoosed.color;
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
                interactFreely(selectedVertex, dist_x, dist_y);
            } else {
                if (type === typeInteraction.SQUARE) {
                    interactSqure(dist_x, dist_y);
                } else if (type === typeInteraction.RECTANGLE) {
                    interactRectangle(dist_x, dist_y);
                } else {
                    interactLine(selectedVertex, dist_x, dist_y);
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
    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseup', onMouseUp);
    drawShape(vertices, color);
}

function interactFreely(selectedVertex, dist_x, dist_y){
    let vertices = modelChoosed.vertices;
    // Move the selected vertex
    vertices[selectedVertex * 2] = dist_x;
    vertices[selectedVertex * 2 + 1] = dist_y;
}

function interactLine(selectedVertex, dist_x, dist_y){
    let vertices = modelChoosed.vertices;
    let [origin_x, origin_y] = getCenter(vertices);
    // Move the selected vertex
    let x1 = origin_x - vertices[0];
    let y1 = origin_y - vertices[1];
    let x2 = origin_x - vertices[2];
    let y2 = origin_y - vertices[3];

    // it is based on the slope of the line (not free movement)
    // Check if the line is vertical or horizontal
    if (Math.abs(x1 - x2) < 0.000001) {
        // Vertical line, only update y
        vertices[selectedVertex * 2 + 1] = dist_y;
    } else if (Math.abs(y1 - y2) < 0.000001) {
        // Horizontal line, only update x
        vertices[selectedVertex * 2] = dist_x;
    } else {
        // Calculate the slope of the line
        let slope = (y2 - y1) / (x2 - x1);
        // Calculate the new y coordinate based on the slope and the new x coordinate
        let newY = slope * (dist_x - origin_x) + origin_y;
        vertices[selectedVertex * 2] = dist_x;
        vertices[selectedVertex * 2 + 1] = newY;
    }
}

function interactSqure(x, y) {
    // when one of the vertices is interacted (with mouse), the square length changes
    // change the length of the square by dragging the vertices
    let vertices = modelChoosed.vertices;
    let [origin_x, origin_y] = getCenter(vertices);

    let dist_x = Math.abs(x - origin_x);
    let dist_y = Math.abs(y - origin_y);

    let dist = Math.sqrt(dist_x * dist_x + dist_y * dist_y) / sqrt_2;
    vertices[0] = origin_x - dist;
    vertices[1] = origin_y - dist;
    vertices[2] = origin_x + dist;
    vertices[3] = origin_y - dist;
    vertices[4] = origin_x + dist;
    vertices[5] = origin_y + dist;
    vertices[6] = origin_x - dist;
    vertices[7] = origin_y + dist;
}

function interactRectangle(x, y) {
    // when one of the vertices is interacted (with mouse), the rectangle length changes
    // the length changes is horizontally or vertically

    let vertices = modelChoosed.vertices;
    let [origin_x, origin_y] = getCenter(vertices);

    let dist_x = Math.abs(x - origin_x);
    let dist_y = Math.abs(y - origin_y);

    vertices[0] = origin_x - dist_x;
    vertices[1] = origin_y - dist_y;
    vertices[2] = origin_x + dist_x;
    vertices[3] = origin_y - dist_y;
    vertices[4] = origin_x + dist_x;
    vertices[5] = origin_y + dist_y;
    vertices[6] = origin_x - dist_x;
    vertices[7] = origin_y + dist_y;
}