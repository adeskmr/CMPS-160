/**
 * Specifies a geometric object.
 *
 * @author Adesh Kumar
 * @this {Geometry}
 */
class Geometry {
  /**
   * Constructor for Geometry.
   *
   * @constructor
   */
  constructor() {
    this.vertices = []; // Vertex objects. Each vertex has x-y-z.
    this.viewMatrix = new Matrix4(); // Model matrix applied to geometric object
    this.modelMatrix = new Matrix4();
    this.shader = null; // shading program you will be using to shade this geometry
    this.texture = null; 
    this.x = 0;
  }

  /**
   * Renders this Geometry within your webGL scene.
   */
  render() {
    var u_LightColor = gl.getUniformLocation(gl.program, 'u_LightColor');
    var u_LightPosition = gl.getUniformLocation(gl.program, 'u_LightPosition');
    var u_AmbientLight = gl.getUniformLocation(gl.program, 'u_AmbientLight');

    if (useNormalShader)
    {
        useShader(gl, shader);
    }
    else
    {
        useShader(gl, shaderN);
        gl.uniform3f(u_LightColor, 1.0, 1.0, 1.0);
        gl.uniform3f(u_LightPosition, 1.0, 2.0, 1.0);
        gl.uniform3f(u_AmbientLight, 0.5, 0.5, 0.5);
        
    }    
   
    var normalMatrix = new Matrix4();

    normalMatrix.setInverseOf(this.modelMatrix);
    normalMatrix.transpose();
    sendUniformMatToGLSL(normalMatrix, "u_NormalMatrix");
    sendVertexBufferToGLSL(this.vertices, 3, "a_Position");
    sendColorBufferToGLSL(this.vertices, 4, "a_Color");
    sendNormalBufferToGLSL(this.vertices, 3, "a_Normal");
    sendUniformMatToGLSL(this.modelMatrix, "u_ModelMatrix");
    tellGLSLToDrawCurrentBuffer(this.vertices.length);

    this.x+=0.1;
  // Recommendations: sendUniformVec4ToGLSL(), tellGLSLToDrawCurrentBuffer(),
  // and sendAttributeBufferToGLSL() are going to be useful here.
}
  /**
   * Responsible for updating the geometry's modelMatrix for animation.
   * Does nothing for non-animating geometry.
   */
  updateAnimation() {
    return;

    // NOTE: This is just in place so you'll be able to call updateAnimation()
    // on geometry that don't animate. No need to change anything.
  }
}
