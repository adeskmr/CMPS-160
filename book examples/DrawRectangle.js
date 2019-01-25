
// DrawRectangle.js 
function main() {
// Retrieve <canvas> element
var canvas = document.getElementById('example'); 
if (!canvas) {
console.log('Failed to retrieve the <canvas> element'); 
return;
}
// Get the rendering context for 2DCG 11 
var ctx = canvas.getContext('2d');
// Draw a blue rectangle <- (3) 
ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a blue color 
ctx.fillRect(120, 10, 150, 150); // Fill a rectangle with the color
ctx.fillStyle='rgba(255, 0, 0, 1.0)'; 
ctx.fillRect(200, 60, 10, 10);
}