/**
 * Specifies a tilted cube which rotates.
 *
 * @author "Adesh Kumar"
 * @this {TiltedCube}
 */
class StaticCube extends Geometry {
  /**
   * Constructor for TiltedCube.
   *
   * @constructor
   * @returns {TiltedCube} Geometric object created
   */
  constructor(size, centerX, centerY, centerZ, height, textureName) {
    super()
    this.size = size
    this.centerX = centerX
    this.centerY = centerY
    this.centerZ = centerZ
    this.height = height
    this.indices = [
           0,  1,  2,      0,  2,  3,    // front
           4,  5,  6,      4,  6,  7,    // back
           8,  9,  10,     8,  10, 11,   // top
           12, 13, 14,     12, 14, 15,   // bottom
           16, 17, 18,     16, 18, 19,   // right
           20, 21, 22,     20, 22, 23,   // left
    ];
    this.modelMatrix.setTranslate(this.centerX, this.centerY, this.centerZ)
    this.modelMatrix.scale(1,this.height,1)
    this.spin = 0
    this.generateCubeVertices()
    this.generateUVCoordinates()
    let path = "./"+textureName
    create2DTexture(path, gl.LINEAR, gl.LINEAR, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE, function (texture) {
      console.log('4')
  send2DTextureToGLSL(texture, 0, 'u_Sampler')
    })


    this.flatData()

  }

  /**
   * Generates the vertices of TiltedCube. Just a regular cube.
   *
   * @private
   */
  generateCubeVertices() {
    for (var i = 0; i < 24; i++) {
      this.vertices[i] = new Vertex()
      this.vertices[i].color = [Math.random(), Math.random(), Math.random()]
    }

    // Front face
    this.vertices[0].points.elements =[-this.size, -this.size,  this.size]
    this.vertices[1].points.elements =[this.size, -this.size,  this.size]
    this.vertices[2].points.elements =[this.size,  this.size,  this.size]
    this.vertices[3].points.elements =[-this.size,  this.size,  this.size]

    // Back face
    this.vertices[4].points.elements =[-this.size, -this.size, -this.size]
    this.vertices[5].points.elements =[-this.size,  this.size, -this.size]
    this.vertices[6].points.elements =[ this.size,  this.size, -this.size]
    this.vertices[7].points.elements =[ this.size, -this.size, -this.size]

    // Top face
    this.vertices[8].points.elements =[-this.size,  this.size, -this.size]
    this.vertices[9].points.elements =[-this.size,  this.size,  this.size]
    this.vertices[10].points.elements =[ this.size,  this.size,  this.size]
    this.vertices[11].points.elements =[ this.size,  this.size, -this.size]

    // Bottom face
    this.vertices[12].points.elements =[-this.size, -this.size, -this.size]
    this.vertices[13].points.elements =[ this.size, -this.size, -this.size]
    this.vertices[14].points.elements =[ this.size, -this.size,  this.size]
    this.vertices[15].points.elements =[-this.size, -this.size,  this.size]

    // Right face
    this.vertices[16].points.elements =[ this.size, -this.size, -this.size]
    this.vertices[17].points.elements =[ this.size,  this.size, -this.size]
    this.vertices[18].points.elements =[ this.size,  this.size,  this.size]
    this.vertices[19].points.elements =[ this.size, -this.size,  this.size]

    // Left face
    this.vertices[20].points.elements =[-this.size, -this.size, -this.size]
    this.vertices[21].points.elements =[-this.size, -this.size,  this.size]
    this.vertices[22].points.elements =[-this.size,  this.size,  this.size]
    this.vertices[23].points.elements =[-this.size,  this.size, -this.size]
  }
  generateUVCoordinates() {


    // Front
    this.vertices[0].uv = [0.0,  0.0]
    this.vertices[1].uv = [1.0,  0.0]
    this.vertices[2].uv = [1.0,  1.0]
    this.vertices[3].uv = [0.0,  1.0]
    // Back
    this.vertices[4].uv = [0.0,  0.0]
    this.vertices[5].uv = [1.0,  0.0]
    this.vertices[6].uv = [1.0,  1.0]
    this.vertices[7].uv = [0.0,  1.0]
    // Top
    this.vertices[8].uv = [0.0,  0.0]
    this.vertices[9].uv = [1.0,  0.0]
    this.vertices[10].uv = [1.0,  1.0]
    this.vertices[11].uv = [0.0,  1.0]
    // Bottom
    this.vertices[12].uv = [0.0,  0.0]
    this.vertices[13].uv = [1.0,  0.0]
    this.vertices[14].uv = [1.0,  1.0]
    this.vertices[15].uv = [0.0,  1.0]
    // Right
    this.vertices[16].uv = [0.0,  0.0]
    this.vertices[17].uv = [1.0,  0.0]
    this.vertices[18].uv = [1.0,  1.0]
    this.vertices[19].uv = [0.0,  1.0]
    // Left
    this.vertices[20].uv = [0.0,  0.0]
    this.vertices[21].uv = [1.0,  0.0]
    this.vertices[22].uv = [1.0,  1.0]
    this.vertices[23].uv = [0.0,  1.0]

  }
}

