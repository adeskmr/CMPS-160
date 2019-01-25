// Nishith Modi
// Assignment 1: Painting Points
// CMPS 160

/**
 * Responsible for initializing buttons, sliders, radio buttons, etc. present
 * within your HTML document.
 */

function initEventHandelers() {
	canvas = document.getElementById('myCanvas');
	clearCanvasButton = document.getElementById('clearCanvas');
	pointSize = document.getElementById("sizeSlider");
	red = document.getElementById("redSlider");
	green = document.getElementById("greenSlider");
	blue = document.getElementById("blueSlider");
}

/**
 * Function called upon mouse click or mouse drag. Computes position of cursor,
 * pushes cursor position as GLSL coordinates, and draws.
 *
 * @param {Object} ev The event object containing the mouse's canvas position
 */
 
function click(ev, gl, canvas, a_Position, a_PointSize, u_FragColor) {
	
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect() ;

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
 

  // console.log(y); 
  var coordinatesText = "x: " + x + " " + "y: " + y;
  sendTextToHTML(coordinatesText, "coordinates");
 
  // Store the coordinates to g_points array
  g_points.push(x); g_points.push(y);
  
  changePointSize(pointSize.value);
  
 // g_pointSize.push(pointSize.value);
  
  changePointColor([red.value, green.value, blue.value, 1.0]);
  
  //g_pointColor.push([red.value, green.value, blue.value, 1.0]);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  var len = g_points.length;
   
  var increment = 0;
 
  for(var i = 0; i < len; i += 2) {
	
	 var rgba = g_pointColor[increment];
	
    // Pass the position of a point to a_Position variable
    gl.vertexAttrib3f(a_Position, g_points[i], g_points[i+1], 0.0);
   // gl.vertexAttrib1f(a_PointSize, g_pointSize[increment]);
   sendUniformFloatToGLSL(g_pointSize[increment], a_PointSize);
   sendUniformVec4ToGLSL(rgba, u_FragColor);
	// gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
	increment++;
	
    // Draw
    gl.drawArrays(gl.POINTS, 0, 1); 
  }
  

}

/**
 * Renders the scene on the HTML canvas.
 */
function render() {
  //
  // YOUR CODE HERE
  //
}

/**
 * Clears the HTML canvas.
 */
function clearCanvas() {
	g_points = [];
	g_pointSize = [];
	g_pointColor = [];
	gl.clear(gl.COLOR_BUFFER_BIT);
	sendTextToHTML("x: --- y: --- ", "coordinates");
}

/**
 * Changes the size of the points drawn on HTML canvas.
 *
 * @param {float} size Real value representing the size of the point.
 */
function changePointSize(size) {
	g_pointSize.push(size);
}

/**
 * Changes the color of the points drawn on HTML canvas.
 *
 * @param {float} color Color value from 0.0 to 1.0.
 */
function changePointColor(color) {
	g_pointColor.push(color);
}

