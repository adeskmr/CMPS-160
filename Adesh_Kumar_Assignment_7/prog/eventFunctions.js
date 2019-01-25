
/**
 * Responsible for initializing buttons, sliders, radio buttons, etc. present
 * within your HTML document.
 */

function initEventHandelers() {
	
	canvas = document.getElementById("myCanvas");
    perspectiveButton = document.getElementById("perspective");
    orthographicButton = document.getElementById("orthographic");
    nearSlider = document.getElementById("near");
    farSlider = document.getElementById("far");
    zoomSlider = document.getElementById("zoom");
    catOBJ = document.getElementById("catOBJ");
	teapotOBJ = document.getElementById("teapotOBJ");
	hud = document.getElementById('hud');  

	// canvas.onmousedown = function(ev) {   // Mouse is pressed
	// 	alert("hello")
	// 	var x = ev.clientX; // x coordinate of a mouse pointer
	// 	var y = ev.clientY; // y coordinate of a mouse pointer

	// 		// var rect = ev.target.getBoundingClientRect();
	// 		// if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
	// 		//   // If pressed position is inside <canvas>, check if it is above object
	// 		//   var x_in_canvas = x - rect.left, y_in_canvas = rect.bottom - y;
	// 		//   console.log("x_in_canvas");
	// 		//   var result = check(x_in_canvas, y_in_canvas);
	// 		// //   var picked = check(gl, n, x_in_canvas, y_in_canvas, u_Clicked, viewProjMatrix, u_MvpMatrix);
	// 		//   if (picked) alert('The cube was selected! ');
	// 		// }
	// 	  }
}

/**
 * Function called upon mouse click or mouse drag. Computes position of cursor,
 * pushes cursor position as GLSL coordinates, and draws.
 *
 * @param {Object} ev The event object containing the mouse's canvas position
 */


/**
 * Clears the HTML canvas.
 */

function addObjToScene() {
	var objectFile = document.getElementById("chooseObjectFile").files[0];
	var textureFile = document.getElementById("chooseTextureFile").files[0];
	var fileReader = new FileReader();
	
	fileReader.onloadend = function() {
		var objString = fileReader.result;
		
		if (textureFile != undefined)
		{
			fileReader.onloadend = function() {
				var textureURL = fileReader.result;
				var texturedOBJ = new TexturedOBJ(objString);
				var callback = function (texture) { texturedOBJ.texture = texture; }
				create2DTexture(textureURL, gl.LINEAR, gl.LINEAR, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE, callback);
				scene.addGeometry(texturedOBJ);
			}
			fileReader.readAsDataURL(textureFile);
			
		}
		else 
		{
			var loadedOBJ = new LoadedOBJ(objString);
			scene.addGeometry(loadedOBJ);
		}
		
	}
	
	fileReader.readAsText(objectFile);
}	

function initializeTerrain(heightData, colorData) {

	// center of the cube
	var centerX = 0; 
	var centerY = 0.85;

	for (let i = 0; i < heightData.length; i += 4) {
		// decide the 3 components of the height starting from the grey shades
		var r = heightData[i] / 255;
		r = Math.round(r * 10) / 10;
		var g = heightData[i + 1] / 255;
		g = Math.round(g * 10) / 10;
		var b = heightData[i + 2] / 255;
		b = Math.round(b * 10) / 10;

		// each 16 pixels (64 elements of the array) you change row
		// the first time this if{} is calculated is when i == 0
		if (i % 64 == 0) {
			centerX = 0.05 - 0.8;
			centerY = centerY - 0.1;
		//	console.log(i);
		}

		// if the height is 0, for efficiency sake you don't want to draw a cube
		if (r == 0.0 && g == 0.0 && b == 0.0)
        {
			centerX = centerX + 0.1; // update x coordinate of the canvas
        }
		else { // otherwise you draw the cube 
			// calculate height 
			var height = Math.sqrt(r * r + g * g + b * b);
			height = Math.round(height * 10) / 10;
            
			// store the color data in the global variable, then
			// the cube class will use the colors to draw each vertex
			red = colorData[i] / 255;
			red = Math.round(red * 10) / 10;
			green = colorData[i + 1] / 255;
			green = Math.round(green * 10) / 10;
			blue = colorData[i + 2] / 255;
			blue = Math.round(blue * 10) / 10;
			      

            scene.addGeometry(new TiltedCube(height, centerX, centerY));
			scene.render();
			

			// update x coordinate of the canvas
			centerX = centerX + 0.1;
		}
		
	}
    
    scene.addGeometry(new Square(0.8, 0, -0.085));
}

function loadImage() {

    var img1 = new Image();
    var img2 = new Image();
    
    img1.crossOrigin = "Anonymous";
    img2.crossOrigin = "Anonymous";
	
    var heightData = [];
	var colorData = [];

    img1.onload = function () {
        heightData = sampleImageColor(img1);

          img2.onload = function () {
			colorData = sampleImageColor(img2);
    
			initializeTerrain(heightData, colorData);
		};
		
	};
    img1.src = "external/terrain/Height_terains.png";
    img2.src = "external/terrain/color_terains.png";
    
}

function keydown(ev) {
    
    switch(ev.keyCode){
        case 74:   // j was pressed
            scene.camera.rotate(10);
            break; 
        case 76:   // l was pressed
            scene.camera.rotate(-10);
            break; 
        case 68:   // d was pressed
            scene.camera.pan(0.05, -1);
            break;  
        case 65:   // a was pressed
            scene.camera.pan(0.05, 1);
            break;  
        case 87:   // w was pressed
            scene.camera.move(0.05, 1);
            break;  
        case 83:   // s was pressed
            scene.camera.move(0.05, -1);
            break;  
		case 78:   // n was pressed
            useNormalShader = !useNormalShader;
            break;
        default: return; // Prevent the unnecessary drawing
	}    
    //draw();
}

function onmouse(ev) {
	
		var x = ev.clientX; // x coordinate of a mouse pointer
		var y = ev.clientY; // y coordinate of a mouse pointer

			var rect = ev.target.getBoundingClientRect();
			if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
			  // If pressed position is inside <canvas>, check if it is above object
			  var x_in_canvas = x - rect.left, y_in_canvas = rect.bottom - y;
			
			  check(x_in_canvas, y_in_canvas);
			//   var picked = check(gl, n, x_in_canvas, y_in_canvas, u_Clicked, viewProjMatrix, u_MvpMatrix);
			}
}

function resize(canvas) {
	console.log(canvas)
  // Lookup the size the browser is displaying the canvas.
  var displayWidth  = canvas.clientWidth;
  var displayHeight = canvas.clientHeight;
 
  // Check if the canvas is not the same size.
  if (canvas.width  != displayWidth ||
      canvas.height != displayHeight) 
  {
 
    // Make the canvas the same size
    canvas.width  = displayWidth;
    canvas.height = displayHeight;
  }
}
function resizeHUD(canvas) {
	console.log(canvas)
  // Lookup the size the browser is displaying the canvas.
  var displayWidth  = ctx.canvas.clientWidth;
  var displayHeight = ctx.canvas.clientHeight;
 
  // Check if the canvas is not the same size.
  if (ctx.canvas.width  != displayWidth ||
	ctx.canvas.height != displayHeight) 
  {
 
    // Make the canvas the same size
    ctx.canvas.width  = displayWidth;
    ctx.canvas.height = displayHeight;
  }
}

function draw2D(ctx) {
	//           
    // Start drawingß
	var img = new Image();
	var img1 = new Image();
	img.onload = function() {
	  ctx.drawImage(img, 10, 10);
	  ctx.beginPath();
	  ctx.stroke();
	}
	img1.onload = function() {
		ctx.drawImage(img1, canvas.width/4, canvas.height-200);
		ctx.beginPath();
		ctx.stroke();
	  }
	img.src = 'color_terrains1.png';
	img1.src = 'hands.png';
  }

  function check(x, y) {
	var picked = false;
	sendUniformIntToGLSL(1, "u_Clicked")
	scene.render();
	// draw(gl, n, currentAngle, viewProjMatrix, u_ModelMatrix); // Draw cube with red
	// Read pixel at the clicked position
	var pixels = new Uint8Array(4); // Array for storing the pixel value
	console.log(pixels);
	gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
  
	if( pixels[3] == 254) {
		picked = true;
		alert('Congratulations, you have found all the teapots!');
	}
	if( pixels[3] == 253) {
		picked = true;
		alert('You found the First teapot! Hint: turn around 	1/3 ');
	}
	if( pixels[3] == 252) {
		picked = true;
		alert('You found the Second teapot! You have one more to find. 2/3 ');
	}
	  sendUniformIntToGLSL(0, "u_Clicked")
	  	// draw(gl, n, currentAngle, viewProjMatrix, u_ModelMatrix); // Draw the cube
	
	scene.render();
  }

/**
 * Changes the size of the points drawn on HTML canvas.
 *
 * @param {float} size Real value representing the size of the point.
 */
//function changePointSize(size) {}

/**
 * Changes the color of the points drawn on HTML canvas.
 *
 * @param {float} color Color value from 0.0 to 1.0.
 */
//function changePointColor(color) {}
