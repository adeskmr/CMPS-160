/**
 * Specifies a geometric object.
 *
 * @author "Your Name Here"
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
    this.color = [];  // The color of your geometric object
    this.uv = [];
    this.modelMatrix = new Matrix4(); // Model matrix applied to geometric object
    this.shader = null; // shading program you will be using to shade this geometry
  }

  /**
   * Renders this Geometry within your webGL scene.
   */
  render() {

    sendAttributeBufferToGLSL(new Float32Array(this.vertices), 3, 'a_Position');
    
    sendAttributeBufferToGLSL(new Float32Array(this.color), 3, 'RGB');

    sendUniformMatToGLSL(this.modelMatrix, 'u_ModelMatrix');

    tellGLSLToDrawCurrentBuffer(this.vertices.length/3);
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
