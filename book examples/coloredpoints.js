// HelloPoint2.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = 
  'attribute vec4 a_Position;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' + // Set the vertex coordinates of the point
  '  gl_PointSize = 10.0;\n' +                    // Set the point size
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'precision mediump float;\n' +
  'uniform vec4 u_FragColor;\n' + // uniform variable
  'void main() {\n' +
  ' gl_FragColor = u_FragColor;\n' +
  '}\n';

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Get the stroage location of attribute variable
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if(a_Position < 0){
    console.log('failed to get the stroage location of a_Position');
    return;
  }

  // Get the storage location of u_FragColor variable
  var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');

  // Register fuction (event handler) to be called on a mouse press
  canvas.onmousedown = function(ev) { click(ev, gl, canvas, a_Position, u_FragColor); };

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 10.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

}

var g_points = []; // the array for a mouse press
var g_colors = []; // the array to store the color of a point
function click(ev, gl, canvas, a_Position, u_FragColor){
  var x = ev.clientX; //X coordinate of a mouse pointer
  var y = ev.clientY; //Y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
  //store the coordinates to g_points array
  g_points.push([x, y]);

  //Store the coordinates to g_colors array
  if(x >= 0.0 && y >= 0.0) {
    g_colors.push([1.0, 0.0, 0.0, 1.0]); //Red
  } else if(x < 0.0 && y < 0.0) { 
    g_colors.push([0.0, 1.0, 0.0, 1.0]); //Green
  } else {
    g_colors.push([1.0,1.0,1.0,1.0]); //White
  }

  //clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  var len = g_points.length;
  for (var i = 0; i < len; i ++) {
    var xy = g_points[i];
    var rgba = g_colors[i];
      //pass the position of a point to a_Position variable
      gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);

      //pass the color of a point to u_FragColor variable
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

      // draw a point
      gl.drawArrays(gl.POINTS, 0, 1);
    }
}