/**
 * Specifies a geometric object.
 *
 * @author "Adesh Kumar"
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
  }

  /**
   * Renders this Geometry within your webGL scene.
   */
  render() {

    sendAttributeBufferToGLSL(new Float32Array(this.vertices), 3, 'a_Position')
    tellGLSLToDrawCurrentBuffer(this.vertices.length/3);

    // Recommendations: sendUniformVec4ToGLSL(), tellGLSLToDrawCurrentBuffer(),
    // and sendAttributeBufferToGLSL() are going to be useful here.
  }

}
