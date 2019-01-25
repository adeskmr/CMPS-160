// Basic Vertex Shader that receives position and size for each vertex (point).
var ASSIGN4_VSHADER =
'attribute vec4 a_Position;\n' +
'uniform mat4 u_ModelMatrix;\n' +
'attribute vec4 RGB;\n' +
'varying vec4 v_RGB;\n' + // varying variable
'void main() {\n' +
' gl_Position = u_ModelMatrix * a_Position;\n' +
' v_RGB = RGB;\n' +
'}\n';

// Basic Fragment Shader that receives a single one color (point).
var ASSIGN4_FSHADER =
'precision mediump float;\n' +
'varying vec4 v_RGB;\n' +
'void main() {\n' +
'  gl_FragColor = v_RGB;\n' +
'}\n';
