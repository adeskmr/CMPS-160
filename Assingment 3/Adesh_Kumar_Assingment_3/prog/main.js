/**
 * Function called when the webpage loads.
 */
var gl;
var canvas;
var boolean = false;
var scene;
var shape_size;
var RGB = []; //point color for next point, [R G B A]

function main() {
   // Retrieve <canvas> element
   canvas = document.getElementById('webgl');

   // Get the rendering context for WebGL
   gl = getWebGLContext(canvas);

   scene = new Scene(gl);
   // Initialize shaders
   if (!initShaders(gl, ASSIGN3_VSHADER, ASSIGN3_FSHADER)) {
     console.log('Failed to intialize shaders.');
     return;
   }

   //calls the eventFunction.js
   initEventHandelers();
   

     //sets background to black
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  tick();

}
