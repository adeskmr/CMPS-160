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
var catObject;
var teapotObject;
var addAnimatedObject = true;
var pan = false;
var useNormalShader = false;

function main() {
  
  initEventHandelers();

  // Get the rendering context for WebGL
  gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
 
  // shader = createShader(gl, VSHADER, FSHADER);
  // useShader(gl, shader);
  shader = createShader(gl, VSHADER6, FSHADER6);
  shaderN = createShader(gl, VSHADER6_N, FSHADER6_N);
  useShader(gl, shader);
    
  scene = new Scene(gl);

    
  perspectiveButton.onclick = function (ev) 
  {
    //  console.log("hi");
      viewMode = "perspective";

  }
    
  orthographicButton.onclick = function (ev)
  {
       viewMode = "orthographic";

  }

  // Register the event handler to be called on key press
  document.onkeydown = function(ev){ keydown(ev); };
    
  // Specify the color for clearing <canvas>
  gl.clearColor(0.2, 0.2, 0.2, 1.0);
  gl.enable(gl.DEPTH_TEST);

  // Clear <canvas>`
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  resize(gl.canvas);
 
   gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            
    catObject = new LoadedOBJ(catOBJ.text, 2.5, Math.random(), Math.random(), Math.random());
    teapotObject = new LoadedOBJ(teapotOBJ.text, 2.5, Math.random(), Math.random(), Math.random());
    scene.addGeometry(catObject);
    scene.addGeometry(teapotObject);
    
 loadImage();
 
 tick();
}


