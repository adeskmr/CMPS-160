
/**
 * Responsible for initializing buttons, sliders, radio buttons, etc. present
 * within your HTML document.
 */
var shape;
var segs;
var onmousedrag = false;
var isRainbow = false;

var image = new Image(); // Create an image object

function initEventHandelers() {
  // on mouse down and mouse drag the function click is called drawing the points
  canvas.onmousemove = function(ev){ if(onmousedrag){
    click(ev);}
  }
   canvas.onmousedown = function(ev){ onmousedrag = true; click(ev);}
   canvas.onmouseup = function(ev){ onmousedrag = false; }

// get the button click for html clear button
document.getElementById('clearButton').onclick = function () { clearCanvas() };

var red = document.getElementById("red");
var green = document.getElementById("green");
var blue = document.getElementById("blue");

var file = document.getElementById("obj");
file.oninput = function() { addObjectToScene(); };

var addpic = document.getElementById("pic");
image.oninput = function() { loadTexture(gl, n, texture, u_Sampler, image); };

var triButton = document.getElementById("tri");
triButton.onclick = function() { shape = 0; }
var squButton = document.getElementById("squ");
squButton.onclick = function() { shape = 1; }
var cirButton = document.getElementById("cir");
cirButton.onclick = function() { shape = 2; }
var cubeButton = document.getElementById("cube");
cubeButton.onclick = function() { shape = 3; }
var rainbowButton = document.getElementById("rainbowButton");
rainbowButton.onclick = function(input) { rainbowButtonPress(rainbowButton); }

shape = 0;
segs = 12;

var sizeSlider = document.getElementById("sizeSlider");
var cir = document.getElementById("cirseg");
cir.oninput = function() { segs = this.value; }
}

function rainbowButtonPress(button){
  console.log("Rainbow Button Press");
  if(isRainbow){
    isRainbow = false;
    button.innerHTML = "Select Rainbow";
  }
  else{
    isRainbow = true;
    button.innerHTML = "Select Solid Color"
  }
}

/**
 * Function called upon mouse click or mouse drag. Computes position of cursor,
 * pushes cursor position as GLSL coordinates, and draws.
 *
 * @param {Object} ev The event object containing the mouse's canvas position
 */
function click(ev) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer

  x = ((x) - canvas.width / 2) / (canvas.width / 2);
  y = (canvas.height / 2 - (y)) / (canvas.height / 2);
  coords = "X: " + x + ", Y: " + y; //gets the x and y coordinate 
  sendTextToHTML(coords, "coord"); //send the x and y coordinate to the html

  console.log("hello1")
  
  if(shape == 0){
    tri = new FluctuatingTriangle(sizeSlider.value/200, x, y);
    //tri.setColor(RGB);
    scene.addGeometry(tri);
  } else if(shape == 1){
    squ = new SpinningSquare(sizeSlider.value/100, x, y);
    //squ.setColor(RGB);
    scene.addGeometry(squ);
  } else if(shape == 2){
    cir = new Circle(.2, segs, x, y);
    //cir.setColor(RGB);
    scene.addGeometry(cir);
  } else {
    cube = new TiltedCube(sizeSlider.value/100, x, y);
    //cir.setColor(RGB);
    scene.addGeometry(cube);
  }

  console.log("hello3")
}

/**
 * Clears the HTML canvas.
 */
function clearCanvas() {
  scene.clearGeometry();
  }

  function addObjectToScene(){
    
    ObjString = document.getElementById('obj').files[0];
    var reader = new FileReader();
           reader.onload = function(e) {
               scene.addGeometry(new LoadedOBJ(e.target.result));
           }
           reader.readAsText(ObjString);
    }
