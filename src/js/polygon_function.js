// Function for polygon model

// Function to add a vertex to the model
function addVertex() {
    if (modelChoosed == undefined) {
        // Create a dot model
        createModel(model.dot);
    } else {
        // Get vertices and color of the model
        let vertices = modelChoosed.vertices;
        let color = modelChoosed.color;

        if (vertices.length == 0) {
            // Add the first vertex at the center of the canvas
            vertices.push(0.0);
            vertices.push(0.0);
        } else if (vertices.length == 2) {
            // Line length is 0.8
            vertices[0] = -0.4;
            vertices[1] = 0.0;
            vertices.push(0.4);
            vertices.push(0.0);
        } else {
            // Calculate the center of the shape
            let maxX = vertices[0];
            let maxY = vertices[1];
            let minX = vertices[0];
            let minY = vertices[1];
            for (let i = 0; i < vertices.length; i += 2) {
                if (vertices[i] > maxX) {
                    maxX = vertices[i];
                }
                if (vertices[i] < minX) {
                    minX = vertices[i];
                }
                if (vertices[i + 1] > maxY) {
                    maxY = vertices[i + 1];
                }
                if (vertices[i + 1] < minY) {
                    minY = vertices[i + 1];
                }
            }
            var centerX = (maxX + minX) / 2;
            var centerY = (maxY + minY) / 2;

            // Add a vertex in middle of the model
            vertices.push(centerX);
            vertices.push(centerY);

            // Calculate the average distance from the center of the shape to existing vertices
            let totalDistance = 0;
            for (let i = 0; i < vertices.length - 2; i += 2) {
                let dx = vertices[i] - centerX;
                let dy = vertices[i + 1] - centerY;
                totalDistance += Math.sqrt(dx * dx + dy * dy);
            }
            let avgDistance = totalDistance / ((vertices.length - 2) / 2);

            // Calculate the angle between vertices
            let angleIncrement = (2 * Math.PI) / (vertices.length / 2);

            // Distribute the new vertex evenly along the perimeter
            let angle = 0;
            for (let i = 0; i < vertices.length; i += 2) {
                let newX = centerX + avgDistance * Math.cos(angle);
                let newY = centerY + avgDistance * Math.sin(angle);
                vertices[i] = newX;
                vertices[i + 1] = newY;
                angle += angleIncrement;
            }
        }

        // Draw the updated shape
        drawShapes();
    }
}

// Function to remove a vertex from the model
function removeVertex() {
    // Get vertices and color of the model
    let vertices = modelChoosed.vertices;
    let color = modelChoosed.color;

    // Ensure there are enough vertices to remove
    if (vertices.length == 0) {
        alert("Cannot remove vertex. There's no vertex remaining.");
        return;
    } else if (vertices.length == 2) {
        // Remove the last vertex from the array
        vertices.pop();
        vertices.pop();
    } else if (vertices.length == 4) {
        // Get the center of the line
        var centerX = (vertices[0] + vertices[2]) / 2;
        var centerY = (vertices[1] + vertices[3]) / 2;

        // Remove the last vertex from the array
        vertices.pop();
        vertices.pop();

        // Update the remaining vertex to the center of the line
        vertices[0] = centerX;
        vertices[1] = centerY;
    } else {
        // Calculate the center of the shape
        let maxX = vertices[0];
        let maxY = vertices[1];
        let minX = vertices[0];
        let minY = vertices[1];
        for (let i = 0; i < vertices.length; i += 2) {
            if (vertices[i] > maxX) {
                maxX = vertices[i];
            }
            if (vertices[i] < minX) {
                minX = vertices[i];
            }
            if (vertices[i + 1] > maxY) {
                maxY = vertices[i + 1];
            }
            if (vertices[i + 1] < minY) {
                minY = vertices[i + 1];
            }
        }
        var centerX = (maxX + minX) / 2;
        var centerY = (maxY + minY) / 2;

        // Remove the last vertex from the array
        vertices.pop();
        vertices.pop();

        // Calculate the average distance from the center of the shape to existing vertices
        let totalDistance = 0;
        for (let i = 0; i < vertices.length; i += 2) {
            let dx = vertices[i] - centerX;
            let dy = vertices[i + 1] - centerY;
            totalDistance += Math.sqrt(dx * dx + dy * dy);
        }
        let avgDistance = totalDistance / (vertices.length / 2);

        // Calculate the angle between vertices
        let angleIncrement = (2 * Math.PI) / (vertices.length / 2);

        // Distribute the remaining vertices evenly along the perimeter
        let angle = 0;
        for (let i = 0; i < vertices.length; i += 2) {
            let newX = centerX + avgDistance * Math.cos(angle);
            let newY = centerY + avgDistance * Math.sin(angle);
            vertices[i] = newX;
            vertices[i + 1] = newY;
            angle += angleIncrement;
        }
    }

    // Draw the updated shape
    drawShapes();
}