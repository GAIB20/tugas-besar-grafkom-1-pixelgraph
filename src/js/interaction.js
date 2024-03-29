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
function interactModel(vertices, color) {
    let isDragging = false;
    let selectedVertex = -1;
    let offsetX = 0.0;
    let offsetY = 0.0;

    // Mouse when clicked on canvas
    canvas.addEventListener('mousedown', function(event) {
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
    });

    // Mouse when moved on canvas
    canvas.addEventListener('mousemove', function(event) {
        if (isDragging) {
            // Get mouse position
            let [x,y] = mousePosition(event);

            // Move the selected vertex
            vertices[selectedVertex * 2] = x - offsetX;
            vertices[selectedVertex * 2 + 1] = y - offsetY;
            
            // Draw the shape with updated vertices
            drawShape(vertices, color);
        }
    });

    // Mouse when released on canvas
    canvas.addEventListener('mouseup', function(event) {
        isDragging = false;
        selectedVertex = -1;
    });

    // Mouse when left canvas
    drawShape(vertices, color);
}

