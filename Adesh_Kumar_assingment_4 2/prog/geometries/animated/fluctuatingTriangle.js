/**
 * Specifies a triangle which fluctuates in size (grows and shrinks).
 *
 * @author "Your Name"
 * @this {FluctuatingTriangle}
 */
class FluctuatingTriangle extends Triangle {
  /**
   * Constructor for FluctuatingTriangle.
   *
   * @constructor
   * @param {Number} size The size of the triangle drawn
   * @param {Number} centerX The center x-position of the triangle
   * @param {Number} centerY The center y-position of the triangle
   */
  constructor(size, centerX, centerY) {
    super(size, centerX, centerY);
    this.size = size;
    this.scale = 1.0;
    this.centerX = centerX;
    this.centerY = centerY;
    this.scalingDown = false;
    // Recomendations: You're going to need a few variables to keep track of
    // information relevant to your animation. For example, to what amount your
    // triangle is currently scaled at.
  }

  /**
   * Updates the animation for FluctuatingTriangle. Grows and shrinks the
   * triangle in size.
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
    
    super.modelMatrix = newMatrix;

    if (this.scale < 1.5 && !this.scalingDown){
      this.scale += 0.01;
      if (this.scale >= 1.5){
        this.scalingDown = true;
      }
    }
    
    if (this.scalingDown){
      this.scale -= 0.01;
      if (this.scale <= 0.5){
        this.scalingDown = false;
      }
    }
    // Recomendations: How much the triangle grows an shrinks is up to you.
    // Might want to shrink it to x.50 at it's smallest point and x1.50 at it's
    // largest point.
    //
    // Keep in mind that no rendering should be done here. updateAnimation()'s
    // purpose is to update the geometry's modelMatrix and any other variables
    // related to animation. It should be the case that after I call
    // updateAnimation() I should be able to call render() elsewhere and have my
    // geometry complete a frame of animation.
  }
}
