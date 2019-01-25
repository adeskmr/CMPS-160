// drawing a single quad (rectangular polygon) with two triangles

var FSIZE = 4; // size of a vertex coordinate (32-bit float)
var VSHADER_SOURCE = null; // vertex shader program
var FSHADER_SOURCE = null; // fragment shader program

// called when page is loaded
function main() {
    // retrieve <canvas> element
    var canvas = document.getElementById('webgl');
    // get the rendering context for WebGL
    var gl = getWebGLContext(canvas);
    if (!gl) {
	console.log('Failed to get the rendering context for WebGL');
	return;
    }
    // load shader files
    loadFile("shader.vert", function(shader_src) { setShader(gl, gl.VERTEX_SHADER, shader_src); });
    loadFile("shader.frag", function(shader_src) { setShader(gl, gl.FRAGMENT_SHADER, shader_src); });
}

// set appropriate shader and start if both are loaded
function setShader(gl, shader, shader_src) {
    if (shader == gl.VERTEX_SHADER)
	VSHADER_SOURCE = shader_src;
    if (shader == gl.FRAGMENT_SHADER)
	FSHADER_SOURCE = shader_src;
    if (VSHADER_SOURCE && FSHADER_SOURCE)
	start(gl);
}

// called when shaders are done loading
function start(gl) {
    // initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
	console.log('Failed to intialize shaders.');
	return;
    }
    // initialize buffers
    var success = initVertexBuffer(gl);
    success = success && initIndexBuffer(gl);
    success = success && initAttributes(gl);  
    if (!success) {
	console.log('Failed to initialize buffers.');
	return;
    }
    // specify the color for clearing <canvas>
    gl.clearColor(0, 0, 0, 1);
    // clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    // set the vertices of the quad
    var vertices = new Float32Array([0.1, 0.1, 0,    // top right
				     0.1, -0.1, 0,   // bottom right
				     -0.1,-0.1, 0,   // bottom left
				     -0.1, 0.1, 0]); // top left
    setVertexBuffer(gl, vertices);
    // set the indices of the quad
    var indices = new Int16Array([0, 1, 2, 0,   // bottom right triangle
				  0, 2, 3, 0]); // top left triangle
    setIndexBuffer(gl, indices);

    // draw vetices and indices
    gl.drawElements(gl.LINE_STRIP, indices.length, gl.UNSIGNED_SHORT, 0);    
}

// initialize vertex buffer
function initVertexBuffer(gl) {
    // create buffer object
    var vertex_buffer = gl.createBuffer();
    if (!vertex_buffer) {
	console.log("failed to create vertex buffer");
	return false;
    }
    // bind buffer objects to targets
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    return true;
}

// initialize index buffer
function initIndexBuffer(gl) {
    // create buffer object
    var index_buffer = gl.createBuffer();
    if (!index_buffer) {
	console.log("failed to create index buffer");
	return false;
    }
    // bind buffer objects to targets
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
    return true;
}

// set data in vertex buffer (given typed float32 array)
function setVertexBuffer(gl, vertices) {
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
}

// set data in index buffer (given typed uint16 array)
function setIndexBuffer(gl, indices) {
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
}

// initializes attributes
function initAttributes(gl) {
    // assign buffer to a_Position and enable assignment
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
	console.log("failed to get storage location of a_Position");
	return false;
    }
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 3, 0);
    gl.enableVertexAttribArray(a_Position);
    return true;
}
