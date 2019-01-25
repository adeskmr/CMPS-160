/**
 * Specifies a Triangle. A subclass of Geometry.
 *
 * @author "Adesh kumar"
 * @this {Triangle}
 */
class Triangle extends Geometry {
  /**
   * Constructor for Triangle.
   *
   * @constructor
   * @param {Number} size The size of the triangle drawn
   * @param {Number} centerX The center x-position of the triangle
   * @param {Number} centerY The center y-position of the triangle
   */
  constructor(size, centerX, centerY) {
    super();
    console.log("tri")
    //super.setColor(color);
    this.generateTriangleVertices(size, centerX, centerY);
    // Recommendations: Remember that Triangle is a subclass of Geometry.
    // "super" keyword can come in handy when minimizing code reuse.
  }

  /**
   * Generates the vertices of the Triangle.
   *
   * @private
   * @param {Number} size The size of the triangle drawn
   * @param {Number} centerX The center x-position of the triangle
   * @param {Number} centerY The center y-position of the triangle
   */
  generateTriangleVertices(size, centerX, centerY) {
    super.vertices = [ centerX - size,   centerY + size,  0, 
                       centerX + size,   centerY + size,  0,
                       centerX,          centerY - size,  0];

    super.color = [red.value/255, green.value/255, blue.value/255, 1.0];

    // Recommendations: Might want to call this within your Triangle constructor.
    // Keeps your code clean :)
  }
}
