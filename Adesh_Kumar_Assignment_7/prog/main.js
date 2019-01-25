/**
 * Function called when the webpage loads.
 */
 
var gl;
var viewMatrix;
var projMatrix;
var shader;
var scene;
var canvas
var perspectiveButton;
var orthographicButton;
var viewMode = "perspective";
var nearSlider;
var farSlider;
var zoomSlider;
var red, green, blue;
var catOBJ;
var teapotOBJ;
var teapotOBJ1;
var teapotOBJ2;
var catObject;
var teapotObject;
var addAnimatedObject = true;
var pan = false;
var hud;
var ctx;
var useNormalShader = false;
var yOBJ = -1;


function main() {
  
  initEventHandelers();
  

  // Get the rendering context for WebGL
  gl = getWebGLContext(canvas);
  ctx = hud.getContext('2d');
  if (!gl || !ctx) {
    console.log('Failed to get rendering context');
    return;
  }
 
  // shader = createShader(gl, VSHADER, FSHADER);
  // useShader(gl, shader);
  shader = createShader(gl, VSHADER6, FSHADER6);
  shaderN = createShader(gl, VSHADER6_N, FSHADER6_N);
  useShader(gl, shader);
    
  scene = new Scene(gl);

  // Register the event handler to be called on key press
  document.onkeydown = function(ev){ keydown(ev); };
  canvas.onmousedown = function(ev) { onmouse(ev); };

  // Specify the color for clearing <canvas>
  gl.clearColor(0.2, 0.2, 0.2, 1.0);
  gl.enable(gl.DEPTH_TEST);

  // Clear <canvas>`
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  resize(gl.canvas);
  resizeHUD(ctx.hud);

 
   gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            
    teapotObject = new LoadedOBJ(teapotOBJ.text, 3, yOBJ, 4, 1, Math.random(), Math.random(), 254/255);
    teapotObject1 = new LoadedOBJ(teapotOBJ.text, -5, yOBJ, -1, Math.random(), 1, Math.random(), 253/255);
    teapotObject2 = new LoadedOBJ(teapotOBJ.text, 15, yOBJ, -7, Math.random(), Math.random(), 1, 252/255);
    scene.addGeometry(teapotObject);
    scene.addGeometry(teapotObject1);
    scene.addGeometry(teapotObject2);
    
 loadImage();
 
 tick();
}


