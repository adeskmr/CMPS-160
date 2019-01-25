/**
 * Specifies a geometric object.
 *
 * @author "Adesh kumar"
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
    this.modelMatrix = new Matrix4();
  }

  /**
   * Renders this Geometry within your webGL scene.
   */
  render() {
    sendUniformVec4ToGLSL(this.color, 'RGB');
    sendAttributeBufferToGLSL(new Float32Array(this.vertices), 3, 'a_Position');
    sendUniformMatToGLSL(this.modelMatrix, 'u_ModelMatrix');
    tellGLSLToDrawCurrentBuffer(this.vertices.length/3);
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

