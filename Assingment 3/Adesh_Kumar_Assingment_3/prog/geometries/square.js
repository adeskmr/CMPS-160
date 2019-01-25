/**
 * Specifies a Square. A subclass of Geometry.
 *
 * @author "Adesh Kumar"
 * @this {Square}
 */
class Square extends Geometry {
  /**
   * Constructor for Square.
   *
   * @constructor
   * @param {Number} size The size of the square drawn
   * @param {Number} centerX The center x-position of the square
   * @param {Number} centerY The center y-position of the square
   */
  constructor(size, centerX, centerY) {
    super();
    console.log("square")
    this.generateSquareVertices(size, centerX, centerY);

    // Recommendations: Remember that Square is a subclass of Geometry.
    // "super" keyword can come in handy when minimizing code reuse.
  }

  /**
   * Generates the vertices of the square.
   *
   * @private
   * @param {Number} size The size of the square drawn
   * @param {Number} centerX The center x-position of the square
   * @param {Number} centerY The center y-position of the square
   */
  generateSquareVertices(size, centerX, centerY) {
    super.vertices = 
     [centerX - size, centerY + size, 0,
      centerX + size, centerY - size, 0,
      centerX - size, centerY - size, 0,
      centerX - size, centerY + size, 0,
      centerX + size, centerY - size, 0,
      centerX + size, centerY + size, 0];
      
     super.color = [red.value/255, green.value/255, blue.value/255, 1.0];

    // Recommendations: Might want to call this within your Square constructor.
    // Keeps your code clean :)
  }
}
