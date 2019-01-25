// Basic Vertex Shader that receives position and size for each vertex (point).
var ASSIGN1_VSHADER =
'attribute vec4 a_Position;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' + // Set the vertex coordinates of the point
  '  gl_PointSize = 10.0;\n' +      // Set the point size
  '}\n';

// Basic Fragment Shader that receives a single one color (point).
var ASSIGN1_FSHADER =
'void main() {\n' +
'  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
'}\n';
