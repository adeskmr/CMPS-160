/**
 * A cube with a single textured applied in multiple different ways. A subclass
 * of TiltedCube.
 *
 * @author "Adesh Kumar"
 * @this {MultiTextureCube}
 */
class MultiTextureCube extends TiltedCube {
  /**
   * Constructor for MultiTextureCube
   *
   * @constructor
   * @param {String} texturePath The filepath/URL of the image used as a texture
   */
  constructor(size, centerX, centerY, color, isRainbow, texturePath) {

    super(size, centerX, centerY, color, isRainbow);
    super.shader = tShader;
    this.tn = tNum++;
    this.texture = null;
    var t = this;
    create2DTexture(texturePath, gl.NEAREST, gl.NEAREST, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE, function(tex) { t.texture = tex; } );
    this.generateUVCoordinates();

    // Recomendations: Might want to call generateUVCoordinates here.
  }

  /**
   * Generates the texture coordinates of CheckerCube.
   *
   * @private
   */
  generateUVCoordinates() {
    super.uv = [ 

      0.0, 0.0, //Front Face
      1.0, 0.0,
      1.0, 1.0, 
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      
      0.0, 0.0, //Back Face
      1.0, 0.0,
      1.0, 0.5, 
      1.0, 0.5,
      0.0, 0.5,
      0.0, 0.0,
      
      0.0, 0.5, //Left Face
      0.0, 1.0,
      1.0, 1.0,
      1.0, 1.0,
      1.0, 0.5,
      0.0, 0.5,

      0.0, 0.0, //Right Face Left Side
      0.0, 1.0,
      1.0, 1.0,
      1.0, 1.0,
      1.0, 0.0,
      0.0, 0.0,
      0.0, 0.0, //Right Face Right Side
      0.0, 1.0,
      1.0, 1.0,
      1.0, 1.0,
      1.0, 0.0,
      0.0, 0.0,
      
      0.0, 0.0, //Top Face
      1.0, 0.0,
      1.0, 1.0, 
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      0.0, 0.0, //Top Face
      1.0, 0.0,
      1.0, 1.0, 
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      0.0, 0.0, //Top Face
      1.0, 0.0,
      1.0, 1.0, 
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      0.0, 0.0, //Top Face
      1.0, 0.0,
      1.0, 1.0, 
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      0.0, 0.0, //Top Face
      1.0, 0.0,
      1.0, 1.0, 
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      0.0, 0.0, //Top Face
      1.0, 0.0,
      1.0, 1.0, 
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      0.0, 0.0, //Top Face
      1.0, 0.0,
      1.0, 1.0, 
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      0.0, 0.0, //Top Face
      1.0, 0.0,
      1.0, 1.0, 
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      0.0, 0.0, //Top Face
      1.0, 0.0,
      1.0, 1.0, 
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      
      0.0, 0.0, //Bottom face
      0.0, 0.0,
      0.0, 0.0,
      0.0, 0.0,
      0.0, 0.0,
      0.0, 0.0
    ];

    // Recomendations: Remember uv coordinates are defined from 0.0 to 1.0.
  }

  /**
   * Renders MultiTextureCube.
   */
  render() {

    if(this.texture != null) {
      useShader(gl, tShader);
      sendAttributeBufferToGLSL(this.uv, 2, 'texCoord');
      send2DTextureToGLSL(this.texture, this.tn, 'texture');
      super.render();
    }

    // Recomendations: This will be the first time render will need to be
    // overloaded. Why? Because this is a textured geometry, not a geometry
    // which relies on a color value. Might want to use
  }

}
