/**
 * Sends data to an attribute variable using a buffer.
 *
 * @private
 * @param {Float32Array} data Data being sent to attribute variable
 * @param {Number} dataCount The amount of data to pass per vertex
 * @param {String} attribName The name of the attribute variable
 */
function sendAttributeBufferToGLSL(data, dataCount, attribName) {
  var attrib = gl.getAttribLocation(gl.program, attribName);
  if (attrib < 0) {
    console.log('Failed to get the storage location of ' + attribName);
    return;
  }

  var vBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuf);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.DYNAMIC_DRAW);
  gl.vertexAttribPointer(attrib, dataCount, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(attrib);

  // Recommendations: This piece of code should do these three things:
  // 1. Create a an attribute buffer
  // 2. Bind data to that buffer
  // 3. Enable the buffer for use

  // Some modifications can be made to this function to improve performance. Ask
  // a TA in lab if you're interested in these modifications.
}

/**
 * Draws the current buffer loaded. Buffer was loaded by sendAttributeBufferToGLSL.
 *
 * @param {Integer} pointCount The amount of vertices being drawn from the buffer.
 */
function tellGLSLToDrawCurrentBuffer(pointCount) {
  console.log(pointCount)
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
function sendUniformFloatToGLSL(uniformName, val) {
  uniformName = gl.getUniformLocation(gl.program, uniformName);
  if (uniformName < 0) {
    console.log('Failed to get the storage location of' + 'uniformName');
    return;
  }
    gl.uniform1f(uniformName, val);
}
  //
  // YOUR CODE HERE
  //

/**
 * Sends an JavaSript array (vector) to the specified uniform variable within
 * GLSL shaders. Array can be of length 2-4.
 *
 * @param {Array} val Array (vector) being passed to uniform variable
 * @param {String} uniformName The name of the uniform variable
 */

function sendUniformVec4ToGLSL(val, uniformName) {
  var unif = gl.getUniformLocation(gl.program, uniformName);
  if(unif < 0) {
    console.log('Failed to get the storage location of' + 'uniformName');
    return;
  }
  if(val.length == 2){
    gl.uniform4f(unif, val[0], val[1], 0, 1.0);
  }
  else if(val.length == 3){
    gl.uniform4f(unif, val[0], val[1], val[2], 0, 1.0);
  }
  else if(val.length == 4){
    gl.uniform4f(unif, val[0], val[1], val[2], val[3]);
  }
}
