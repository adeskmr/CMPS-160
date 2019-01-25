//ADESH KUMAR
//akumar25@ucsc.edu
// eventFunction.js
//CMPS160

/**
 * Responsible for initializing buttons, sliders, radio buttons, etc. present
 * within your HTML document.
 */
function initEventHandelers() {
  // get the button click for html clear button
  document.getElementById('clearButton').onclick = function () { clearCanvas() };
  // get the html information from point slider
  var x = document.getElementById("slider").value;
  document.getElementById("slider").addEventListener("onchange", changePointSize(x));

  var slider = document.getElementById("slider"); //get the id from the html
  slider.oninput = function () {
    changePointSize(this.value) //sends point size to funtion
  }
  // reads all the html inputs 
  var input = document.querySelectorAll("input");
  // sets an array to get the html color values
  for(var i = 0; i < input.length; i++){
    input[i].addEventListener("input", function(){
      var red = document.getElementById("red").value,
          green = document.getElementById("green").value,
          blue = document.getElementById("blue").value;
      
      changePointColor(red, green, blue);
    });
  }
}

/**
 * Function called upon mouse click or mouse drag. Computes position of cursor,
 * pushes cursor position as GLSL coordinates, and draws.
 *
 * @param {Object} ev The event object containing the mouse's canvas position
 */
var g_points = []; // The array for the position of a mouse press

function click(ev, gl, canvas, a_Position) { 
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
  y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);
  coords = "X: " + x + ", Y: " + y; //gets the x and y coordinate 
  sendTextToHTML(coords, "coord"); //send the x and y coordinate to the html
  // Store the coordinates to g_points array
  g_points.push([x,y]);

  render(); // sends to render to draw
}

/**
 * Renders the scene on the HTML canvas.
 */
function render() {
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
  gl.clear(gl.COLOR_BUFFER_BIT); // clears the canvas

  for(let i = 0; i < g_points.length; i += 2) {
    var xy = g_points[i];

    // Pass the position of a point to a_Position variable
    sendUniformVec4ToGLSL(xy,a_Position);

    // Draw
    gl.drawArrays(gl.POINTS, 0, 1);
  }
  console.log("RENDER");
}

/**
 * Clears the HTML canvas.
 */
function clearCanvas() {
  g_points = []; // sets points to zero
  console.log("clear");
  gl.clearColor(0.0, 0.0, 0.0, 1.0); //sets the canvas to black
  gl.clear(gl.COLOR_BUFFER_BIT);

  render();
}

/**
 * Changes the size of the points drawn on HTML canvas.
 var g_sizes = []; // The array for the position of a mouse press
 * @param {float} size Real value representing the size of the point.
 */
var g_sizes = []; // The array for the point size

function changePointSize(a_Size) {
  // Get the storage location of a_PointSize
  var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
  if (a_PointSize < 0) {
    console.log('Failed to get the storage location of a_PointSize');
    return;
  }
  // Store the size to g_sizes array
  g_sizes.push(a_Size);

  // loop to move through the array but doesn't work
  for (var i = 0; i < g_sizes.length; i += 1) {
    var size = g_sizes[i];

  // sends to glslFunction.js
  gl.vertexAttrib1f("a_PointSize", size);
  render();
  }

  console.log("a_Size");
}

/**
 * Changes the color of the points drawn on HTML canvas.
 *
 * @param {float} color Color value from 0.0 to 1.0.
 */
function changePointColor(red, green, blue) {
  // Get the storage location of u_FragColor variable
  var a_FragColor = gl.getUniformLocation(gl.program, 'a_FragColor');
  // place the rgb in an array to read and divide by 255 to get colors
  var color = new Float32Array([red/255,green/255,blue/255,1.0]); 
  gl.uniform4fv(a_FragColor, color);
  render();
}
