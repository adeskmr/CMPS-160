// Basic Vertex Shader that receives position and size for each vertex (point).
var ASSIGN4_VSHADER =
'attribute vec4 a_Position;\n' +
'uniform mat4 u_ModelMatrix;\n' +
'uniform mat4 u_ViewMatrix;\n' +
'uniform mat4 u_ProjMatrix;\n' +
'attribute vec4 RGB;\n' +
'varying vec4 v_RGB;\n' + // varying variable
'void main() {\n' +
'gl_Position = u_ProjMatrix * u_ViewMatrix * u_modelMatrix * a_Position;\n' +
' v_RGB = RGB;\n' +
'}\n';

// Basic Fragment Shader that receives a single one color (point).
var ASSIGN4_FSHADER =
'precision mediump float;\n' +
'varying vec4 v_RGB;\n' +
'void main() {\n' +
'  gl_FragColor = v_RGB;\n' +
'}\n';


//##### TA JACOB MODIFIED FUNCTION!!! DOUBLE CHECK IF THERE ARE ANY DIFFERENCES IN PREVIOUS VERSION

// Basic Vertex Shader that receives position and size for each vertex (point).
var OBJ_VSHADER =
'attribute vec4 a_Position;\n' +
'attribute float a_ShapeSize;\n' +
'attribute vec4 a_Color;\n' +
'varying vec4 v_Color;\n' +
'uniform mat4 u_ModelMatrix;\n' +
'void main() {\n' +
'  gl_Position = u_ModelMatrix * a_Position;\n' +
'  gl_PointSize = a_ShapeSize;\n' +
'  v_Color = a_Color;\n' + 
'}\n';

// Basic Fragment Shader that receives a single one color (point).
var OBJ_FSHADER =
'precision mediump float;\n' +
'varying vec4 v_Color;\n' +
'void main() {\n' +
'  gl_FragColor = v_Color;\n' +
'}\n';

var ASSIGN4_VSHADER_TEXTURE =
    'attribute vec4 a_Position;\n' +
    'uniform mat4 u_ModelMatrix;\n' +
    'uniform mat4 u_ViewMatrix;\n' +
    'uniform mat4 u_ProjMatrix;\n' +
	'attribute vec2 aTextureCoord;\n' +
	'varying vec2 vTextureCoord;\n' +
	'void main() {\n' +
	'gl_Position = u_ModelMatrix * a_Position;\n' +
	'  vTextureCoord = aTextureCoord;\n' +
	'}\n';
	

var ASSIGN4_FSHADER_TEXTURE = 
	'precision mediump float;\n' +
	'uniform sampler2D u_Sampler;\n' + 
	'varying vec2 vTextureCoord;\n' +
	'void main() {\n' +
	'	gl_FragColor = texture2D(u_Sampler, vTextureCoord);\n' +
	'}\n';
	
	