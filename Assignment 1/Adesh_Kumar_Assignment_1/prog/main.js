//ADESH KUMAR
//akumar25@ucsc.edu
// main.js
//CMPS160

/**
 * Function called when the webpage loads.
 */
var gl = null;
var canvas = null;
var boolean = false;
var coords = null;
var a_Position = null;
var a_PointSize = null;
// main.js
function main() {
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  gl = getWebGLContext(canvas);

  // Initialize shaders
  if (!initShaders(gl, ASSIGN1_VSHADER, ASSIGN1_FSHADER)) {
    console.log('Failed to intialize shaders.');
    return;
  }
  //calls the eventFunction.js
  initEventHandelers();

  // Get the storage location of a_Position
   a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  //sets background to black
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
  // on mouse down and mouse drag the function click is called drawing the points
  canvas.onmousemove = function(ev){ if(onmousedrag){
    click(ev, gl, canvas, a_Position);}
  }
   canvas.onmousedown = function(ev){ onmousedrag = true; click(ev, gl, canvas, a_Position);}
   canvas.onmouseup = function(ev){ onmousedrag = false; click(ev, gl, canvas, a_Position);}

}