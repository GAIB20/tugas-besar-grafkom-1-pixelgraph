// Function to change the color of the chosen model
function changeColor(colorValue) {
    // Convert hexadecimal color value to RGB
    modelChoosed.color = hexToRGB(colorValue);
    // Redraw shapes with the new color
    drawShapes();
}

// Function to convert hexadecimal color to RGB format
function hexToRGB(hex) {
    hex = hex.replace(/^#/, ''); // Remove '#' from the beginning of the string
    let bigint = parseInt(hex, 16); // Parse hexadecimal to an integer

    // Extract red, green, and blue components from the integer
    let r = ((bigint >> 16) & 255) / 255; // Red component
    let g = ((bigint >> 8) & 255) / 255;   // Green component
    let b = (bigint & 255) / 255;          // Blue component

    // Return RGB components as an array along with alpha set to 1
    return [r, g, b, 1];
}