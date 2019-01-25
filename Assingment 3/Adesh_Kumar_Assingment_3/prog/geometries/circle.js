/**
 * Specifies a Circle. A subclass of Geometry.
 *
 * @author "Adesh Kumar"
 * @this {Circle}
 */
class Circle extends Geometry {
  /**
   * Constructor for Circle.
   *
   * @constructor
   * @param {Number} radius The radius of the circle being constructed
   * @param {Integer} segments The number of segments composing the circle
   * @param {Number} centerX The central x-position of the circle
   * @param {Number} centerY The central y-position of the circle
   */
  constructor(radius, segments, centerX, centerY) {
    super();
    this.generateCircleVertices(radius, segments, centerX, centerY);

    // Recommendations: Remember that Circle is a subclass of Geometry.
    // "super" keyword can come in handy when minimizing code reuse.
  }

  /**
   * Generates the vertices of the Circle.
   *
   * @private
   * @param {Number} radius The radius of the circle being constructed
   * @param {Integer} segments The number of segments composing the circle
   * @param {Number} centerX The central x-position of the circle
   * @param {Number} centerY The central y-position of the circle
   */
  generateCircleVertices(radius, segments, centerX, centerY) {
 // Recommendations: Might want to call this within your Circle constructor.
    // Keeps your code clean :)
    var point = [];
    console.log("circle")

    //Do the top half
    for(var i = 0; i < segments*2; ++i){
      //center point
      point.push(centerX, centerY, 0);
      //outer point 1
      point.push( radius * Math.cos(i * Math.PI / segments) + centerX, radius * Math.sin(i * Math.PI / segments) + centerY, 0 );
      //outer point 2
      point.push( radius * Math.cos((i+1) * Math.PI / segments) + centerX, radius * Math.sin((i+1) * Math.PI / segments) + centerY, 0 );
    }
    
    super.vertices = point;
    super.color = [red.value/255, green.value/255, blue.value/255, 1.0];

  }
}
