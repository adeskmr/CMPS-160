/**
 * Specifies a tilted cube which rotates.
 *
 * @author "Adesh Kumar"
 * @this {TiltedCube}
 */
class TiltedCube extends Geometry {
  /**
   * Constructor for TiltedCube.
   *
   * @constructor
   * @returns {TiltedCube} Geometric object created
   */
  constructor(size, centerX, centerY) {
    super();
    this.size = size;
    this.centerX = centerX;
    this.centerY = centerY;
    this.angle = 0;
    this.generateCubeVertices();
    // Recommendations: Might want to tilt your cube at 30 degrees relative to
    // the z-axis here. Pretty good tilt that lets us see that it's a cube.
  }

  /**
   * Generates the vertices of TiltedCube. Just a regular cube.
   *
   * @private
   */
  generateCubeVertices() {
    super.vertices = [this.centerX+this.size, this.centerY+this.size, this.centerX+this.size, 
      this.centerX+this.size, this.centerY-this.size, this.centerX+this.size, 
      this.centerX-this.size, this.centerY-this.size, this.centerX+this.size, 
      this.centerX-this.size, this.centerY-this.size, this.centerX+this.size, 
      this.centerX-this.size, this.centerY+this.size, this.centerX+this.size, 
      this.centerX+this.size, this.centerY+this.size, this.centerX+this.size, 
      this.centerX+this.size, this.centerY+this.size, this.centerX-this.size, 
      this.centerX+this.size, this.centerY-this.size, this.centerX-this.size, 
      this.centerX-this.size, this.centerY-this.size, this.centerX-this.size,
      this.centerX-this.size, this.centerY-this.size, this.centerX-this.size, 
      this.centerX-this.size, this.centerY+this.size, this.centerX-this.size, 
      this.centerX+this.size, this.centerY+this.size, this.centerX-this.size,
      this.centerX-this.size, this.centerY+this.size, this.centerX+this.size, 
      this.centerX-this.size, this.centerY-this.size, this.centerX+this.size, 
      this.centerX-this.size, this.centerY-this.size, this.centerX-this.size,
      this.centerX-this.size, this.centerY-this.size, this.centerX-this.size, 
      this.centerX-this.size, this.centerY+this.size, this.centerX-this.size, 
      this.centerX-this.size, this.centerY+this.size, this.centerX+this.size,
      this.centerX+this.size, this.centerY+this.size, this.centerX-this.size, 
      this.centerX+this.size, this.centerY-this.size, this.centerX-this.size, 
      this.centerX+this.size, this.centerY-this.size, this.centerX+this.size,
      this.centerX+this.size, this.centerY-this.size, this.centerX+this.size, 
      this.centerX+this.size, this.centerY+this.size, this.centerX+this.size, 
      this.centerX+this.size, this.centerY+this.size, this.centerX-this.size,
      this.centerX+this.size, this.centerY+this.size, this.centerX-this.size, 
      this.centerX+this.size, this.centerY+this.size, this.centerX+this.size, 
      this.centerX-this.size, this.centerY+this.size, this.centerX+this.size,
      this.centerX-this.size, this.centerY+this.size, this.centerX+this.size, 
      this.centerX-this.size, this.centerY+this.size, this.centerX-this.size, 
      this.centerX+this.size, this.centerY+this.size, this.centerX-this.size, 
      this.centerX+this.size, this.centerY-this.size, this.centerX+this.size, 
      this.centerX+this.size, this.centerY-this.size, this.centerX-this.size, 
      this.centerX-this.size, this.centerY-this.size, this.centerX-this.size,
      this.centerX-this.size, this.centerY-this.size, this.centerX-this.size, 
      this.centerX-this.size, this.centerY-this.size, this.centerX+this.size, 
      this.centerX+this.size, this.centerY-this.size, this.centerX+this.size];

      var baseColors = [ 
        [Math.random(red.value/255), Math.random(green.value/255), Math.random(blue.value/255)],
        [Math.random(red.value/255), Math.random(green.value/255), Math.random(blue.value/255)],
        [Math.random(red.value/255), Math.random(green.value/255), Math.random(blue.value/255)]];
    
    for(var i = 0; i < this.vertices.length; ++i){
        if(isRainbow){
          this.color.push(baseColors[i%3][0]);
          this.color.push(baseColors[i%3][1]);
          this.color.push(baseColors[i%3][2]);
        }
        else{
          this.color.push(red.value/255);
          this.color.push(green.value/255);
          this.color.push(blue.value/255);
        }
      }

    // Recommendations: Might want to generate your cube vertices so that their
    // x-y-z values are combinations of 1.0 and -1.0. Allows you to scale the
    // the cube to your liking better.
  }

  /**
   * Updates the animation of the TiltedCube. Should make it rotate.
   */
  updateAnimation() {
    var tranl_origin = new Matrix4();
    var scale_tri = new Matrix4();
    var cube = new Matrix4();
    var tranl_back = new Matrix4();
    var newMatrix = new Matrix4();

    tranl_back.setTranslate(this.centerX, this.centerY, this.centerX);
    scale_tri.setRotate(this.angle, 0, 1, 0);
    cube.setRotate(30, 1, 0, 0);
    tranl_origin.setTranslate(-this.centerX, -this.centerY, -this.centerX);

    newMatrix = tranl_origin.multiply(newMatrix);
    newMatrix = scale_tri.multiply(newMatrix);
    newMatrix = cube.multiply(newMatrix);
    newMatrix = tranl_back.multiply(newMatrix);

    super.modelMatrix = newMatrix;
    this.angle+=-0.5;
    // Recommendations: Do not simply apply a rotation matrix. Doing so will
    // cause your cube to spin in a circle around the axis you've chosen.
    //
    // Keep in mind that no rendering should be done here. updateAnimation()'s
    // purpose is to update the geometry's modelMatrix and any other variables
    // related to animation. It should be the case that after I call
    // updateAnimation() I should be able to call render() elsewhere and have my
    // geometry complete a frame of animation.
  }
}
