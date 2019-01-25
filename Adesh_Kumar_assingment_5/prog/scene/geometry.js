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
    this.spin = 0;
    this.vertices = []; 
    this.color = [1,1,1,1];
    this.modelMatrix = new Matrix4(); 
    this.shader = null; 
    this.data = []
    this.uv = []
    this.colors = []
  }


  flatData() {
    //We push all points array to data
    for (var i = 0; i < this.vertices.length; i++) {
      this.data.push(Array.prototype.slice.call(this.vertices[i].points.elements))
      this.uv.push(Array.prototype.slice.call(this.vertices[i].uv))
      this.colors.push(Array.prototype.slice.call(this.vertices[i].color))
    }

    this.data = new Float32Array(this.data.flat())
    this.uv = new Float32Array(this.uv.flat())
    this.colors = new Float32Array(this.colors.flat())

  }

  render() {
    useShader(gl, tShader);
    // sendTextureBufferToGLSL(this.uv_data, 2, "aTextureCoord"); 
    sendAttributeBufferToGLSL(this.uv, 2, 'aTextureCoord', 2, 0);
    sendAttributeBufferToGLSL(this.data, 3, 'a_Position')
    sendUniformMatToGLSL(this.modelMatrix.elements, "u_ModelMatrix")
    console.log(this.modelMatrix.elements)
    send2DTextureToGLSL(this.texture, 0, 'u_Sampler')
    if(this instanceof StaticCube) {
      sendIndicesBufferToGLSL(this.indices)
      tellGLSLToDrawCurrentBuffer(36, ModesEnum.elements)
    } else {
      tellGLSLToDrawCurrentBuffer(this.vertices.length)
    }
  }

  /**
   * Responsible for updating the geometry's modelMatrix for animation.
   * Does nothing for non-animating geometry.
   */
  updateAnimation() {
    return;
  }
}

