//ADESH KUMAR
//akumar25@ucsc.edu
// glslFunction.js
//CMPS160

/**
 * Sends a float value to the specified uniform variable within GLSL shaders.
 * Prints an error message if unsuccessful.
 *
 * @param {float} val The float value being passed to uniform variable
 * @param {String} uniformName The name of the uniform variable
 */

function sendUniformFloatToGLSL(val, uniformName) {

      gl.vertexAttrib1f(uniformName, val);  

  
    console.log("hello1");
      // YOUR CODE HERE
  //
}

/**
 * Sends an JavaSript array (vector) to the specified uniform variable within
 * GLSL shaders. Array can be of length 2-4.
 *
 * @param {Array} val Array (vector) being passed to uniform variable
 * @param {String} uniformName The name of the uniform variable
 */
function sendUniformVec4ToGLSL(val, uniformName) {
  //
  gl.vertexAttrib3f(uniformName, val[0], val[1], 0.0);
      // YOUR CODE HERE
  //
}
