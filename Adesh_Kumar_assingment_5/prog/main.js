/**
 * Function called when the webpage loads.
 */
var gl;
var canvas;
var boolean = false;
var scene;
var shape_size;
var RGB = []; //point color for next point, [R G B A]
var tShader = null;
var program;
var objProgram;//MADE BOTH SHADER PROGRAMS GLOBAL
var texture;

var ModesEnum = Object.freeze({
  "fan":1,
  "elements": 2
})

var MatrixEnum = Object.freeze({
  "projection":1,
  "orthogonal": 2
})



function main() {
   // Retrieve <canvas> element
   canvas = document.getElementById('webgl');
   // Get the rendering context for WebGL
   gl = getWebGLContext(canvas);
   if(!gl) {
    console.log('Failed to get rendering context');
    return;
  }
   gl.clearColor(0, 0, .2, 1.0);
   gl.enable(gl.DEPTH_TEST);
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
   resize(canvas);

   tShader = createShader(gl, ASSIGN4_VSHADER_TEXTURE, ASSIGN4_FSHADER_TEXTURE);
   objProgram = createShader(gl, OBJ_VSHADER, OBJ_FSHADER);//CREATED ADDITIONAL SHADER PROGRAM

   scene = new Scene()
   scene.camera = new Camera(false) //false for orth
   //calls the eventFunction.js
   initEventHandelers();
 
   tick();

}

function resize(canvas) {
  console.log("size1");
  // Lookup the size the browser is displaying the canvas.
  var displayWidth  = window.innerWidth;
  var displayHeight = window.innerHeight;
  console.log(displayWidth)
  // Check if the canvas is not the same size.

    // Make the canvas the same size
    canvas.width  = displayWidth;
    canvas.height = displayHeight;
    console.log("work")
    console.log('Resized canvas to ' + canvas.width + ', ' + canvas.height);
  
}
