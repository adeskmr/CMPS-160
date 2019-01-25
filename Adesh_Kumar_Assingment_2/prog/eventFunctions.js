
/**
 * Responsible for initializing buttons, sliders, radio buttons, etc. present
 * within your HTML document.
 */
var shape;
var segs;

function initEventHandelers() {
  // on mouse down and mouse drag the function click is called drawing the points
    canvas.onmousemove = function(ev){ if(onmousedrag){
      click(ev);}
    }
     canvas.onmousedown = function(ev){ onmousedrag = true; click(ev);}
     canvas.onmouseup = function(ev){ onmousedrag = false; click(ev);}

  // get the button click for html clear button
  document.getElementById('clearButton').onclick = function () { clearCanvas() };

  var triButton = document.getElementById("tri");
  triButton.onclick = function() { shape = 0; }
  var squButton = document.getElementById("squ");
  squButton.onclick = function() { shape = 1; }
  var cirButton = document.getElementById("cir");
  cirButton.onclick = function() { shape = 2; }
  shape = 0;
  segs = 12;

  var sizeSlider = document.getElementById("sizeSlider");
  var cir = document.getElementById("cirseg");
  cir.oninput = function() { segs = this.value; }

  shape = 0;
  segs = 12;
}

/**
 * Function called upon mouse click or mouse drag. Computes position of cursor,
 * pushes cursor position as GLSL coordinates, and draws.
 *
 * @param {Object} ev The event object containing the mouse's canvas position
 */
var g_points = []; // The array for the position of a mouse press
var g_colors = []; 

function click(ev) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer

  x = ((x) - canvas.width / 2) / (canvas.width / 2);
  y = (canvas.height / 2 - (y)) / (canvas.height / 2);
  coords = "X: " + x + ", Y: " + y; //gets the x and y coordinate 
  sendTextToHTML(coords, "coord"); //send the x and y coordinate to the html

  console.log("hello1")
  
  if(shape == 0){
    scene.addGeometry(new Triangle(sizeSlider.value/200, x, y));
  } else if(shape == 1){
    scene.addGeometry(new Square(sizeSlider.value/100, x, y));
  } else{
    scene.addGeometry(new Circle(.2, 8, x, y));
  }
  scene.render();
  console.log("hello3")
  
}

/**
 * Clears the HTML canvas.
 */
function clearCanvas() {
scene.clearGeometry();
}

/**
 * Changes the color of the points drawn on HTML canvas.
 *
 * @param {float} color Color value from 0.0 to 1.0.
 */
function changePointColor(color) {
  //
  // YOUR CODE HERE
  //
}
