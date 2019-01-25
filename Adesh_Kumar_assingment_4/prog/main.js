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

   var program = createShader(gl, ASSIGN4_VSHADER, ASSIGN4_FSHADER);
   useShader(gl, program);
   
   //calls the eventFunction.js
   initEventHandelers();
   

     //sets background to black
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  tick();

}
