/**
 * Specifies a circle which moves randomly.
 *
 * @author "Adesh Kumar"
 * @this {RandomCircle}
 */
class RandomCircle extends Circle {
  /**
   * Constructor for RandomCircle.
   *
   * @constructor
   * @param {Number} radius The radius of the random circle being constructed
   * @param {Integer} segements The number of segments composing the circle
   * @param {Number} centerX The x-position of the circle being constructed
   * @param {Number} centerY The y-position of the circle being constructed
   * @returns {RandomCircle} RandomCircle object created
   */
  constructor(radius, segments, centerX, centerY) {
    super(radius, segments, centerX, centerY) 
    this.radius = radius;
    this.centerX = centerX;
    this.centerY = centerY;
    this.time = 120;
    // Recomendations: You're going to need a few variables to keep track of
    // information relevant to your animation. For example, a circle is going
    // to need a variable to keep track of the direction the circle is moving.
  }

  /**
   * Updates random circle's animation. Changes modelMatrix into a translation
   * matrix translating into a random direction.
   */
  updateAnimation() {

    var tranl_origin = new Matrix4();
    var scale_tri = new Matrix4();
    var tranl_back = new Matrix4();
    var newMatrix = new Matrix4();

    tranl_back.setTranslate(this.centerX, this.centerY, 0);
    scale_tri.setScale(this.scale, this.scale, 0);
    tranl_origin.setTranslate(-this.centerX, -this.centerY, 0);

    newMatrix = tranl_origin.multiply(newMatrix);
    newMatrix = scale_tri.multiply(newMatrix);
    newMatrix = tranl_back.multiply(newMatrix);
    //
    // YOUR CODE HERE
    //

    // Recomendations: Refer to README.txt for more detalied recommendations
    //
    // Keep in mind that no rendering should be done here. updateAnimation()'s
    // purpose is to update the geometry's modelMatrix and any other variables
    // related to animation. It should be the case that after I call
    // updateAnimation() I should be able to call render() elsewhere and have my
    // geometry complete a frame of animation.
  }

}
