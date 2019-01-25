/**
 * Specifies a square which spins realtive to its center.
 *
 * @author "Adesh Kumar"
 * @this {SpinningSquare}
 */
class SpinningSquare extends Square {
  /**
   * Constructor for SpinningSquare.
   *
   * @constructor
   * @param {Number} size The size of the square drawn
   * @param {Number} centerX The center x-position of the square
   * @param {Number} centerY The center y-position of the square
   * @returns {SpinningSquare} SpinningSquare object created
   */
  constructor(size, centerX, centerY, color) {
    super(size, centerX, centerY, color);
    console.log("spinning square")
    this.centerX = centerX;
    this.centerY = centerY;
    this.angle = 0;
    // Recomendations: You're going to need a few variables to keep track of
    // information relevant to your animation. For example, a square is going
    // to need a variable to keep track of its centerX and centerY position.
  }

  /**
   * Updates the animation for spinning square. Rotates the square by spinAngle
   * relative to its center.
   */
  updateAnimation() {
    var tranl_origin = new Matrix4();
    var scale_tri = new Matrix4();
    var tranl_back = new Matrix4();
    var newMatrix = new Matrix4();

    tranl_back.setTranslate(this.centerX, this.centerY, 0);
    scale_tri.setRotate(this.angle, 0, 0, 1);
    tranl_origin.setTranslate(-this.centerX, -this.centerY, 0);

    newMatrix = tranl_origin.multiply(newMatrix);
    newMatrix = scale_tri.multiply(newMatrix);
    newMatrix = tranl_back.multiply(newMatrix);
    
    super.modelMatrix = newMatrix;
    this.angle+=.5;

    // Recomendations: Do not simply apply a rotation matrix. Doing so will
    // cause your square to spin in a circle on screen.
    //
    // Keep in mind that no rendering should be done here. updateAnimation()'s
    // purpose is to update the geometry's modelMatrix and any other variables
    // related to animation. It should be the case that after I call
    // updateAnimation() I should be able to call render() elsewhere and have my
    // geometry complete a frame of animation.
  }
}
