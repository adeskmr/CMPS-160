/**
 * A tilted cube that has a checkerboard texture applied to it. A subclass of
 * TiltedCube.
 *
 * @author "Adesh Kumar"
 * @this {CheckerCube}
 */
class CheckerCube extends TiltedCube {
  /**
   * Constructor for CheckerCube
   *
   * @constructor
   * @returns {CheckerCube}
   */
  constructor() {
    super();
    this.generateUVCoordinates();

    // Recomendations: Might want to call generateUVCoordinates here.
  }

  /**
   * Generates the texture coordinates of CheckerCube.
   *
   * @private
   */
  generateUVCoordinates() {
    //
    // YOUR CODE HERE
    //

    // var cube = [0.0 ,0.0, 0.0, // triangle 1 : begin
    //   0.0, 0.0, 1.0,
    //   0.0, 1.0, 1.0, // triangle 1 : end
    //   1.0, 1.0, 0.0, // triangle 2 : begin
    //   0.0, 0.0, 0.0,
    //   0.0, 1.0, 0.0, // triangle 2 : end
    //   1.0, 0.0, 1.0,
    //   0.0, 0.0, 0.0,
    //   1.0, 0.0, 0.0,
    //   1.0, 1.0, 0.0,
    //   1.0, 0.0 ,0.0,
    //   0.0, 0.0, 0.0,
    //   0.0, 0.0, 0.0,
    //   0.0, 1.0, 1.0,
    //   0.0, 1.0, 0.0,
    //   1.0, 0.0, 1.0,
    //   0.0, 0.0, 1.0,
    //   0.0, 0.0, 0.0,
    //   0.0, 1.0, 1.0,
    //   0.0, 0.0, 1.0,
    //   1.0, 0.0, 1.0,
    //   1.0, 1.0, 1.0,
    //   1.0, 0.0, 0.0,
    //   1.0, 1.0, 0.0,
    //   1.0, 0.0, 0.0,
    //   1.0, 1.0, 1.0,
    //   1.0, 0.0, 1.0,
    //   1.0, 1.0, 1.0,
    //   1.0, 1.0, 0.0,
    //   0.0, 1.0, 0.0,
    //   1.0, 1.0, 1.0,
    //   0.0, 1.0, 0.0,
    //   0.0, 1.0, 1.0,
    //   1.0, 1.0, 1.0,
    //   0.0, 1.0, 1.0,
    //   1.0, 0.0, 1.0]

    // Recomendations: Remember uv coordinates are defined from 0.0 to 1.0.
  }

  /**
   * Renders CheckerCube.
   */
  render() {

    send2DTextureToGLSL(val, textureUnit, uniformName)

    // Recomendations: This will be the first time render will need to be
    // overloaded. Why? Because this is a textured geometry, not a geometry
    // which relies on a color value.
  }
}
