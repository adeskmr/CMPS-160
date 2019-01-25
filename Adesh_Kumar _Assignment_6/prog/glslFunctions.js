/**
 * Sends a WebGL 2D texture object (created by load2DTexture) and sends it to
 * the shaders.
 *
 * @param val The WebGL 2D texture object being passed
 * @param {Number} textureUnit The texture unit (0 - 7) where the texture will reside
 * @param {String} uniformName The name of the uniform variable where the texture's
 * textureUnit location (0 - 7) will reside
 */
function send2DTextureToGLSL(val, textureUnit, uniformName) {
  
  console.log("in send 2D texture");
  var glTextureUnit = determineGLTextureUnit(textureUnit);
  var uniform = gl.getUniformLocation(gl.program, uniformName);

  gl.activeTexture(glTextureUnit);
  gl.bindTexture(gl.TEXTURE_2D, val);
  gl.uniform1i(uniform, textureUnit);


  // Recomendations: Within this funciton, you should:
  //    1. Gather your uniform location
  //    2. Determine the texture unit you will be using (gl.TEXTURE"N")
  //    3. Activate your texture unit using gl.activeTexture
  //    4. Bind your texture using gl.bindTexture
  //    5. Send the texture unit (textureUnit not the one you found) to your
  //       uniform location.
}

/**
 * Creates a WebGl 2D texture object.
 *
 * @param imgPath A file path/data url containing the location of the texture image
 * @param magParam texParameteri for gl.TEXTURE_MAG_FILTER. Can be gl.NEAREST,
 * gl.LINEAR, etc.
 * @param minParam texParameteri for gl.TEXTURE_MIN_FILTER. Can be gl.NEAREST,
 * gl.LINEAR, etc.
 * @param wrapSParam texParameteri for gl.TEXTURE_WRAP_S. Can be gl.REPEAT,
 * gl. MIRRORED_REPEAT, or gl.CLAMP_TO_EDGE.
 * @param wrapTParam texParameteri for gl.TEXTURE_WRAP_S. Can be gl.REPEAT,
 * gl. MIRRORED_REPEAT, or gl.CLAMP_TO_EDGE.
 * @param callback A callback function which executes with the completed texture
 * object passed as a parameter.
 */
function create2DTexture(imgPath, magParam, minParam, wrapSParam, wrapTParam, callback) {
	var texImg = new Image();
	
	texImg.onload = function() {
		var newTexture = gl.createTexture();

		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,1);
		gl.bindTexture(gl.TEXTURE_2D, newTexture);

		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magParam);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minParam);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapSParam);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapTParam);
	
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texImg);

		callback(newTexture);
	};

	texImg.src = imgPath;

  // Recomendations: This function should see you creating an Image object,
  // setting that image object's ".onload" to an anonymous function containing
  // the rest of your code, and setting that image object's ".src" to imgPath.
  //
  // Within the anonymous function:
  //  1. create a texture object by saving the result of gl.createTexture()
  //  2. Flip your image's y-axis and bind your texture object to gl.TEXTURE_2D
  //  3. Using multiple calls to gl.texParameteri, pass magParam, minParam,
  //     wrapSParam, and wrapTParam.
  //  4. Set the texture's image to the loaded image using gl.texImage2D
  //  5. Pass your completed texture object to your callback function
  //
  // NOTE: This function should not return anything.
}

function determineGLTextureUnit(textureUnit) {
	switch (textureUnit) {
		case 0: 
			return gl.TEXTURE0;
		case 1:
			return gl.TEXTURE1;
		case 2:
			return gl.TEXTURE2;
		case 3:
			return gl.TEXTURE3;
		case 4:
			return gl.TEXTURE4;
		case 5:
			return gl.TEXTURE5;
		case 6:
			return gl.TEXTURE6;
		case 7:
			return gl.TEXTURE7;
	}
}

function isPowerOf2(imageAttribute) {
	return (imageAttribute & (imageAttribute - 1)) == 0;
}

/**
 * Sends data to a uniform variable expecting a matrix value.
 *
 * @private
 * @param {Array} val Value being sent to uniform variable
 * @param {String} uniformName Name of the uniform variable recieving data
 */
 function sendUniformMatToGLSL(val, uniformName) {
	
	var uN = gl.getUniformLocation(gl.program, uniformName);
	
	if (!uN) {
		console.log("Failed to get " + uniformName + " variable");
		return;
	}
	
	gl.uniformMatrix4fv(uN, false, val.elements);

   // Recomendations: This is going to be very similar to sending a float/vec.
}

/**
 * Sends data to an attribute variable using a buffer.
 *
 * @private
 * @param {Float32Array} data Data being sent to attribute variable
 * @param {Number} dataCount The amount of data to pass per vertex
 * @param {String} attribName The name of the attribute variable
 */
function sendAttributeBufferToGLSL(data, dataCount, attribName, stride = 0, offset = 0) {
	// Create a buffer object
	let buffer = gl.createBuffer();
	if (!buffer) {
	  console.log('Failed to create the buffer object ')
	  return
	}
	// Bind the buffer object to target
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	// Write date into the buffer
	gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  
	let attribute = gl.getAttribLocation(gl.program, attribName);
	if (attribute < 0) {
	  console.log('Failed to get the storage location of '+attribName)
	  return
	}
  
	let FSIZE = data.BYTES_PER_ELEMENT;
	// Assign the buffer object to attribute variable
	gl.vertexAttribPointer(attribute, dataCount, gl.FLOAT, false, FSIZE*stride, FSIZE*offset);
	gl.enableVertexAttribArray(attribute);
  }

/**
 * Draws the current buffer loaded. Buffer was loaded by sendAttributeBufferToGLSL.
 *
 * @param {Integer} pointCount The amount of vertices being drawn from the buffer.
 */
function tellGLSLToDrawCurrentBuffer(pointCount) {
	gl.drawArrays(gl.TRIANGLES, 0, pointCount);
  // Recommendations: Should only be one line of code.
}

/**
 * Sends a float value to the specified uniform variable within GLSL shaders.
 * Prints an error message if unsuccessful.
 *
 * @param {float} val The float value being passed to uniform variable
 * @param {String} uniformName The name of the uniform variable
 */
function sendUniformFloatToGLSL(val, uniformName) {
	gl.vertexAttrib1f(uniformName, val);
}

/**
 * Sends an JavaSript array (vector) to the specified uniform variable within
 * GLSL shaders. Array can be of length 2-4.
 *
 * @param {Array} val Array (vector) being passed to uniform variable
 * @param {String} uniformName The name of the uniform variable
 */
function sendUniformVec4ToGLSL(val, uniformName) {
	// Get the storage location of uniform variable
	let u_var = gl.getUniformLocation(gl.program, uniformName);
	if (!u_var) {
	  console.log('Failed to get '+uniformName+' variable');
	  return;
	}
	//We have to handle each case now differently
	switch (val.length) {
	  case 2:
		gl.uniform2fv(u_var, val);
		break;
	  case 3:
		gl.uniform3fv(u_var, val);
		break;
	  case 4:
		gl.uniform4fv(u_var, val);
		break;
	  default:
		console.log('Wrong array size')
		return
	}
  }

function sendVertexBufferToGLSL(vertexData, dataCount, attribName){
	var data = [];
	
	for (var i = 0; i < vertexData.length; i++)
	{
		data.push(vertexData[i].points[0]);
		data.push(vertexData[i].points[1]);
		data.push(vertexData[i].points[2]);
	}	
	
	sendAttributeBufferToGLSL(new Float32Array(data), dataCount, attribName);
}
function sendNormalBufferToGLSL(vertexData, dataCount, attribName){
	var data = [];
	
	for (var i = 0; i < vertexData.length; i++)
	{
		data.push(vertexData[i].points[0]);
		data.push(vertexData[i].points[1]);
		data.push(vertexData[i].points[2]);
	}	
	
	sendAttributeBufferToGLSL(new Float32Array(data), dataCount, attribName);
}



function sendColorBufferToGLSL(vertexData, dataCount, attribName){
	var data = [];
	
	for (var i = 0; i < vertexData.length; i++)
	{
		data.push(vertexData[i].color[0]);
		data.push(vertexData[i].color[1]);
		data.push(vertexData[i].color[2]);
		data.push(vertexData[i].color[3]);
	}	
	
	sendAttributeBufferToGLSL(new Float32Array(data), dataCount, attribName);
}

function sendTextureBufferToGLSL(vertexData, dataCount, attribName){
	var data = [];
	
	for (var i = 0; i < vertexData.length; i++)
	{
		data.push(vertexData[i].uv[0]);
		data.push(vertexData[i].uv[1]);
	}	
	
	sendAttributeBufferToGLSL(new Float32Array(data), dataCount, attribName);
}
