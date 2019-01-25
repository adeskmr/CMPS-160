
var VSHADER6 =
 'attribute vec4 a_Position;\n' +
 'attribute vec4 a_Color;\n' +
 'attribute vec4 u_Colorid;\n' +
 'attribute vec4 a_Normal;\n' +
 'uniform bool u_Clicked;\n' +
 'varying vec4 v_Color;\n' + 
 'varying vec3 v_Normal;\n' +
 'varying vec3 u_directionalVector;\n' +
 'varying vec3 v_Position;\n' +
 'attribute float a_PointSize;\n' +
 'uniform mat4 u_ViewMatrix;\n' +   
 'uniform mat4 u_ModelMatrix;\n' +
 'uniform mat4 u_ProjMatrix;\n' +
 'uniform mat4 u_NormalMatrix;\n' + 
 
 'void main() {\n' +
 'v_Color = a_Color;\n' +
 ' gl_Position = u_ProjMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;\n' + // Coordinates
 ' gl_PointSize =  a_PointSize;\n' + // Set the point size
 ' v_Position = vec3(u_ModelMatrix *    a_Position);\n' +
 ' v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
 '  if (u_Clicked) {\n' + //  Draw in red if mouse is pressed
 '    v_Color = u_Colorid;\n' +
 '  } else {\n' +
 '    v_Color = a_Color;\n' +
 '  }\n' +
 '}\n';

var FSHADER6 =  
  'precision mediump float;\n' +
  'uniform vec3 u_LightColor;\n' +     // Light color
  'uniform vec3 u_LightPosition;\n' +  // Position of the light source
  'uniform vec3 u_AmbientLight;\n' +   // Ambient light color
  'varying vec4 v_Color;\n' +  // uniform変数
  'varying vec3 v_Normal;\n' +
  'varying vec3 v_Position;\n' +
  'void main() {\n' +
     // Normalize the normal because it is interpolated and not 1.0 in length any more
  '  vec3 normal = normalize(v_Normal);\n' +
     // Calculate the light direction and make its length 1.
  '  vec3 lightDirection = normalize(u_LightPosition - v_Position);\n' +
     // The dot product of the light direction and the orientation of a surface (the normal)
  '  float nDotL = max(dot(lightDirection, normal), 0.0);\n' +
     // Calculate the final color from diffuse reflection and ambient reflection
  '  vec3 diffuse = u_LightColor * v_Color.rgb * nDotL;\n' +
  '  vec3 ambient = u_AmbientLight * v_Color.rgb;\n' +
  '  gl_FragColor = vec4(diffuse + ambient, v_Color.a);\n' +
'}\n';

var VSHADER6_N =
 'attribute vec4 a_Position;\n' +
 'attribute vec4 a_Color;\n' +
 'attribute vec4 a_Normal;\n' +
 'varying vec4 v_Color;\n' + 
 'varying vec3 v_Normal;\n' +
 'varying vec3 v_Position;\n' +
 'attribute float a_PointSize;\n' +
 'uniform mat4 u_ViewMatrix;\n' +   
 'uniform mat4 u_ModelMatrix;\n' +
 'uniform mat4 u_ProjMatrix;\n' +
 'uniform mat4 u_NormalMatrix;\n' + 
 
 'void main() {\n' +
 'v_Color = a_Color;\n' +
 ' gl_Position = u_ProjMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;\n' + // Coordinates
 ' gl_PointSize =  a_PointSize;\n' + // Set the point size
 ' v_Position = vec3(u_ModelMatrix *    a_Position);\n' +
 ' v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
 ' v_Color = a_Color;\n' + 
 '}\n';

var FSHADER6_N =  
  'precision mediump float;\n' +
  'uniform vec3 u_LightColor;\n' +     // Light color
  'uniform vec3 u_LightPosition;\n' +  // Position of the light source
  'uniform vec3 u_AmbientLight;\n' +   // Ambient light color
  'varying vec4 v_Color;\n' +  // uniform変数
  'varying vec3 v_Normal;\n' +
  'varying vec3 v_Position;\n' +
  'void main() {\n' +
     // Normalize the normal because it is interpolated and not 1.0 in length any more
  '  vec3 normal = normalize(v_Normal);\n' +
  '  vec3 position = normalize(v_Position);\n' + 
     // Calculate the light direction and make its length 1.
  '  vec3 lightPosition = normalize(u_LightPosition);\n' + 
  '  vec3 lightDirection = normalize(lightPosition - v_Position);\n' +
  '  vec3 reflectVec = reflect(-lightPosition, normal);\n' +
     // The dot product of the light direction and the orientation of a surface (the normal)
  '  float nDotL = max(dot(lightPosition, normal), 0.0);\n' +
     // Calculate the final color from diffuse reflection and ambient reflection
  '  float specAngle = max(dot(reflectVec, position), 0.0);\n' + 
  '  float specular = pow(specAngle, 2.0);\n' +
  '  vec3 diffuse = u_LightColor * v_Color.rgb * nDotL;\n' +
  '  vec3 ambient = u_AmbientLight * v_Color.rgb;\n' +
  '  gl_FragColor = vec4(diffuse + ambient + specular, v_Color.a);\n' +
'}\n';

